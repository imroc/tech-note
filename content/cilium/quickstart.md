# 快速入门

## 什么是 Cilium？

基于 eBPF 的云原生网络解决方案，主要支持 Kubernetes，本文也讲围绕 Cilium 支持 Kubernetes 展开。

## Cilium 可以用来干嘛？

- 网络安全控制：
  - 三层访问控制（[Layer 3 Policy](https://docs.cilium.io/en/stable/security/policy/language/#layer-3-examples)）。
  - 四层访问控制（[Layer 4 Policy](https://docs.cilium.io/en/stable/security/policy/language/#layer-4-examples)）。
  - 七层访问控制（[Layer 7 Policy](https://docs.cilium.io/en/stable/security/policy/language/#layer-7-examples)）。
  - 完整能力通过 CRD [CiliumNetworkPolicy](https://docs.cilium.io/en/stable/network/kubernetes/policy/#ciliumnetworkpolicy) 提供，同时也兼容 Kubernetes 标准的 [NetworkPlicy](https://kubernetes.io/docs/tasks/administer-cluster/network-policy-provider/cilium-network-policy/) (支持 L3 和 L4)。
- 容器网络实现：
  - Overlay 模式：基于 VXLAN 和 Geneve 封包让容器 IP 在集群内能够转发，对网络基础设置要求极低（只要节点之间网络可以互通就行），几乎可以兼容所有环境。
  - 路由模式：基于 Linux 路由表实现让容器 IP 在集群内能够转发，性能更高。
- ClusterIP 转发：可替代 kube-proxy 实现 ClusterIP 转发，性能更高。
- 网络限速：通过 CNI 插件的形式实现对从节点流出的容器流量进行限速。
