# patch

## patch all: 对所有同类型的资源做相同的 patch

举例：为所有的 ConfigMap 加上 ArgoCD 的注解，避免自动加上 `kubectl.kubernetes.io/last-applied-configuration` 这个注解导致 ConfigMap 大小超限：`argocd.argoproj.io/sync-options: ServerSideApply=true`

```yaml title="cm-patch.yaml" showLineNumbers
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    argocd.argoproj.io/sync-options: ServerSideApply=true
  name: not-important
```

```yaml title="kustomization.yaml" showLineNumbers
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
patches:
  - path: cm-patch.yaml
    target:
      kind: ConfigMap
```
