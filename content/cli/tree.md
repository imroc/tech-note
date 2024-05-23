# tree

## 只展示部分目录

```bash
$ tree apps -P 'jellyfin|monitoring' --matchdirs --prune
apps
├── jellyfin
│   ├── daemonset.yaml
│   └── kustomization.yaml
└── monitoring
    ├── kustomization.yaml
    ├── namespace.yaml
    ├── values.yaml
    └── vm-hostpath-pv.yaml
```
