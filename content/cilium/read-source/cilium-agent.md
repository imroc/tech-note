# cilium-agent 源码解析

## 功能与模块索引

cilium-agent 通过 Daemonset 部署在每个节点上，其涉及的功能众多，集中在 `daemon/cmd/cells.go` 代码文件中索引各功能模块。

## API

cilium-agent 提供了一套 HTTP API，本机的 `cilium-cni` 插件会通过 unix socket 调用。

比如当一个新的 Pod 被创建，cilium-cni 会调用 `cilium-agent` 提供的 `PUT /endpoint/{id}` 接口，然后 `cilium-agent` 会再向 apiserver 写入 `CiliumEndpoint` 对象，再返回相关信息给 `cilium-cni`。

API 的 Handler 索引:

```go title="api/v1/server/server.go"
type apiParams struct {
  ...
	EndpointDeleteEndpointHandler        endpoint.DeleteEndpointHandler
	EndpointDeleteEndpointIDHandler      endpoint.DeleteEndpointIDHandler
	PolicyDeleteFqdnCacheHandler         policy.DeleteFqdnCacheHandler
	IpamDeleteIpamIPHandler              ipam.DeleteIpamIPHandler
	PolicyDeletePolicyHandler            policy.DeletePolicyHandler
	PrefilterDeletePrefilterHandler      prefilter.DeletePrefilterHandler
	BgpGetBgpPeersHandler                bgp.GetBgpPeersHandler
	BgpGetBgpRoutePoliciesHandler        bgp.GetBgpRoutePoliciesHandler
	BgpGetBgpRoutesHandler               bgp.GetBgpRoutesHandler
	DaemonGetCgroupDumpMetadataHandler   daemon.GetCgroupDumpMetadataHandler
	DaemonGetClusterNodesHandler         daemon.GetClusterNodesHandler
	DaemonGetConfigHandler               daemon.GetConfigHandler
	DaemonGetDebuginfoHandler            daemon.GetDebuginfoHandler
	EndpointGetEndpointHandler           endpoint.GetEndpointHandler
	EndpointGetEndpointIDHandler         endpoint.GetEndpointIDHandler
	EndpointGetEndpointIDConfigHandler   endpoint.GetEndpointIDConfigHandler
	EndpointGetEndpointIDHealthzHandler  endpoint.GetEndpointIDHealthzHandler
	EndpointGetEndpointIDLabelsHandler   endpoint.GetEndpointIDLabelsHandler
	EndpointGetEndpointIDLogHandler      endpoint.GetEndpointIDLogHandler
	PolicyGetFqdnCacheHandler            policy.GetFqdnCacheHandler
	PolicyGetFqdnCacheIDHandler          policy.GetFqdnCacheIDHandler
	PolicyGetFqdnNamesHandler            policy.GetFqdnNamesHandler
	DaemonGetHealthzHandler              daemon.GetHealthzHandler
	PolicyGetIPHandler                   policy.GetIPHandler
	PolicyGetIdentityHandler             policy.GetIdentityHandler
	PolicyGetIdentityEndpointsHandler    policy.GetIdentityEndpointsHandler
	PolicyGetIdentityIDHandler           policy.GetIdentityIDHandler
	ServiceGetLrpHandler                 service.GetLrpHandler
	DaemonGetMapHandler                  daemon.GetMapHandler
	DaemonGetMapNameHandler              daemon.GetMapNameHandler
	DaemonGetMapNameEventsHandler        daemon.GetMapNameEventsHandler
	DaemonGetNodeIdsHandler              daemon.GetNodeIdsHandler
	PolicyGetPolicyHandler               policy.GetPolicyHandler
	PolicyGetPolicySelectorsHandler      policy.GetPolicySelectorsHandler
	PrefilterGetPrefilterHandler         prefilter.GetPrefilterHandler
	ServiceGetServiceHandler             service.GetServiceHandler
	DaemonPatchConfigHandler             daemon.PatchConfigHandler
	EndpointPatchEndpointIDHandler       endpoint.PatchEndpointIDHandler
	EndpointPatchEndpointIDConfigHandler endpoint.PatchEndpointIDConfigHandler
	EndpointPatchEndpointIDLabelsHandler endpoint.PatchEndpointIDLabelsHandler
	PrefilterPatchPrefilterHandler       prefilter.PatchPrefilterHandler
	IpamPostIpamHandler                  ipam.PostIpamHandler
	IpamPostIpamIPHandler                ipam.PostIpamIPHandler
	EndpointPutEndpointIDHandler         endpoint.PutEndpointIDHandler
	PolicyPutPolicyHandler               policy.PutPolicyHandler
}
```

## bpf maps 初始化

ebpf 程序主要通过 maps 进行数据交互，cilium-agent 用户态程序将对账后的数据存到 ebpf maps 中，内核态的 ebpf 程序通过 maps 数据执行相应的逻辑。

cilium 不同的逻辑使用不同的 map 存储数据，具体的初始化逻辑在也在不同的模块下，使用 hive 模块化管理，方便维护。daemon 还有一部分启动逻辑未 hive 化，在这个启动逻辑中也对一些 map 显式的进行了初始化。

显式初始化：

```go title="daemon/cmd/datapath.go"
func (d *Daemon) initMaps() error {
  // 显式初始化一些 bpf maps
}
```

其它 maps 初始化逻辑主要分布在 `pkg/maps` 下的一些子模块，负载均衡的比较特殊，在 `pkg/loadbalancer/maps` 这个模块下：

```go title="pkg/loadbalancer/maps/lbmaps.go"
func (r *BPFLBMaps) Start(ctx cell.HookContext) (err error) {
	mapsToCreate, mapsToDelete := r.allMaps()
	for _, desc := range mapsToCreate {
		if r.Pinned {
			if err := m.OpenOrCreate(); err != nil {
				return fmt.Errorf("opening map %s: %w", m.Name(), err)
			}
		} 
	}
  ...
}
func (r *BPFLBMaps) allMaps() ([]mapDesc, []mapDesc) {
  ...
	v4Maps := []mapDesc{
		{&r.service4Map, NewService4Map, r.Cfg.LBServiceMapEntries},
		{&r.backend4Map, NewBackend4Map, r.Cfg.LBBackendMapEntries},
		{&r.revNat4Map, NewRevNat4Map, r.Cfg.LBRevNatEntries},
		{&r.maglev4Map, newMaglev4, r.Cfg.LBMaglevMapEntries},
		{&r.sockRevNat4Map, NewSockRevNat4Map, r.Cfg.LBSockRevNatEntries},
		{&r.affinity4Map, newAffinity4Map, r.Cfg.LBAffinityMapEntries},
	}
	v6Maps := []mapDesc{
		{&r.service6Map, NewService6Map, r.Cfg.LBServiceMapEntries},
		{&r.backend6Map, NewBackend6Map, r.Cfg.LBBackendMapEntries},
		{&r.revNat6Map, NewRevNat6Map, r.Cfg.LBRevNatEntries},
		{&r.maglev6Map, newMaglev6, r.Cfg.LBMaglevMapEntries},
		{&r.sockRevNat6Map, NewSockRevNat6Map, r.Cfg.LBSockRevNatEntries},
		{&r.affinity6Map, newAffinity6Map, r.Cfg.LBAffinityMapEntries},
	}
	affinityMap := mapDesc{&r.affinityMatchMap, NewAffinityMatchMap, r.Cfg.LBAffinityMapEntries}
	v4SourceRangeMap := mapDesc{&r.sourceRange4Map, NewSourceRange4Map, r.Cfg.LBSourceRangeMapEntries}
	v6SourceRangeMap := mapDesc{&r.sourceRange6Map, NewSourceRange6Map, r.Cfg.LBSourceRangeMapEntries}
  ...
}
```


## 数据对账与同步

cilium 使用 statedb 存储数据，通过泛型实现存储任意数据类型的数据，并可添加数据变化时的 hook 操作逻辑，实现任意数据类型的对账。

`newBPFReconciler` 是创建 ebpf 数据同步调谐器的关键函数：

```go title="pkg/loadbalancer/reconciler/bpf_reconciler.go"
func newBPFReconciler(p reconciler.Params, g job.Group, cfg loadbalancer.Config, ops *BPFOps, fes statedb.Table[*loadbalancer.Frontend], w *writer.Writer) (reconciler.Reconciler[*loadbalancer.Frontend], error) {
...
```


传入的 `BPFOps` 包含 statedb 中 `loadbalancer.Frontend` 数据变化时的对账逻辑，关键入口是 `Update` 函数：

```go
// Update implements reconciler.Operations.
func (ops *BPFOps) Update(_ context.Context, txn statedb.ReadTxn, _ statedb.Revision, fe *loadbalancer.Frontend) error {
```

