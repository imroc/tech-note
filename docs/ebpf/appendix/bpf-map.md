# BPF 映射

## 什么是 BPF 映射？

eBPF 用户态和内核态程序通过 BPF 映射来交换数据，内核态程序可以创建、更新、删除、查询 BPF 映射，用户态程序可以查询 BPF 映射，并且多个程序可以共享同一个 BPF 映射：

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2025%2F07%2F11%2F20250711100540.png)

## 如何创建 BPF 映射？

BPF 映射如何创建呢？需要通过用户态程序的系统调用来创建，下面示例代码创建了一个 BPF 映射并返回文件描述符：

```c
int bpf_create_map(enum bpf_map_type map_type,
       unsigned int key_size,
       unsigned int value_size, unsigned int max_entries)
{
  union bpf_attr attr = {
    .map_type = map_type,
    .key_size = key_size,
    .value_size = value_size,
    .max_entries = max_entries
  };
  return bpf(BPF_MAP_CREATE, &attr, sizeof(attr));
}
```

如果使用 bcc 之类的开发工具，会有进一步的封装，可以用宏来简化 BPF 映射的创建。

## 有哪些类型的 BPF 映射？

创建 BPF 映射时，需要指定 BPF 映射的类型，可以通过如下方法查看当前内核版本支持的 BPF 映射类型：

```bash
bpftool feature probe | grep map_type
eBPF map_type hash is available
eBPF map_type array is available
eBPF map_type prog_array is available
eBPF map_type perf_event_array is available
eBPF map_type percpu_hash is available
eBPF map_type percpu_array is available
eBPF map_type stack_trace is available
eBPF map_type cgroup_array is available
eBPF map_type lru_hash is available
eBPF map_type lru_percpu_hash is available
eBPF map_type lpm_trie is available
eBPF map_type array_of_maps is available
eBPF map_type hash_of_maps is available
eBPF map_type devmap is available
eBPF map_type sockmap is available
eBPF map_type cpumap is available
eBPF map_type xskmap is available
eBPF map_type sockhash is available
eBPF map_type cgroup_storage is available
eBPF map_type reuseport_sockarray is available
eBPF map_type percpu_cgroup_storage is available
eBPF map_type queue is available
eBPF map_type stack is available
eBPF map_type sk_storage is available
eBPF map_type devmap_hash is available
eBPF map_type struct_ops is available
eBPF map_type ringbuf is available
eBPF map_type inode_storage is available
eBPF map_type task_storage is available
eBPF map_type bloom_filter is available
eBPF map_type user_ringbuf is available
eBPF map_type cgrp_storage is available
```

也可以参考内核头文件 [include/uapi/linux/bpf.h](https://github.com/torvalds/linux/blob/v6.15/include/uapi/linux/bpf.h#L967) 中的 `bpf_map_type` 定义。

## BPF 映射能否被持久化？

BPF 映射默认会在用户态程序关闭文件描述符时被内核自动删除，如果希望用户态程序推出或重启后，BPF 映射不被清理，就需要调用 `BPF_OBJ_PIN` 命令将 BPF 映射挂载到 `/sys/fs/bpf` 中。

## 如何在命令行操作 BPF 映射？

可以用 `bpftool` 命令行工具来查看或操作 BPF 映射：

```bash
# 创建一个哈希表映射，并挂载到/sys/fs/bpf/stats_map(Key和Value的大小都是2字节)
bpftool map create /sys/fs/bpf/stats_map type hash key 2 value 2 entries 8 name stats_map

# 查询系统中的所有映射
bpftool map
# 示例输出
# 340: hash  name stats_map  flags 0x0
#         key 2B  value 2B  max_entries 8  memlock 4096B

# 向哈希表映射中插入数据
bpftool map update name stats_map key 0xc1 0xc2 value 0xa1 0xa2

# 查询哈希表映射中的所有数据
bpftool map dump name stats_map
# 示例输出
# key: c1 c2  value: a1 a2
# Found 1 element

# 删除哈希表映射
rm /sys/fs/bpf/stats_map
```

