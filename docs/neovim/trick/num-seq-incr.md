# 数字序列递增

## 在已有数字序列上递增

`<C-v>` 选中需要递增的列，然后 `g<C-a>`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/gif/vim-seq.gif)

要在原有数字上+1 的话，`<C-v>` 选中需要递增的列，然后 `<C-a>`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/2024%2F09%2F11%2F20240911121238.gif)

同理，要实现+n，`<C-a>` 改为 `n<C-a>` 即可，减的话 `<C-a>` 改为 `<C-x>` 即可。

## 在指定数字范围递增

`:put=range(1,20)`:

![](https://image-host-1251893006.cos.ap-chengdu.myqcloud.com/gif/vim-put-range.gif)
