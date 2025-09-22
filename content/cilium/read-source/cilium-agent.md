# cilium-agent 源码解析

## 功能与模块索引

cilium-agent 通过 Daemonset 部署在每个节点上，其涉及的功能众多，集中在 `daemon/cmd/cells.go` 代码文件中索引各功能模块。

## API

cilium-agent 提供了一套 HTTP API，本机的 `cilium-cni` 插件会通过 unix socket 调用。

比如当一个新的 Pod 被创建，cilium-cni 会调用 `cilium-agent` 提供的 `PUT /endpoint/{id}` 接口，然后 `cilium-agent` 会再向 apiserver 写入 `CiliumEndpoint` 对象，再返回相关信息给 `cilium-cni`。

具体各个 API 的 Handler 索引在 `api/v1/server/server.go` 文件中：

```go
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
