# 升级到 MacOS 26.2 后使用 neovim 打开 markdown 文件会立即崩溃

## 现象

当 MacOS 升级系统到 26.2 后，使用 neovim 打开 markdown 文件會立即崩潰。

## 崩溃报告

在 `控制台` 应用中可以看到 nvim 进程的崩溃报告：

```txt
-------------------------------------
Translated Report (Full Report Below)
-------------------------------------
Process:             nvim [3450]
Path:                /opt/homebrew/*/nvim
Identifier:          nvim
Version:             ???
Code Type:           ARM-64 (Native)
Role:                Default
Parent Process:      nvim [3447]
Coalition:           net.kovidgoyal.kitty [1158]
Responsible Process: kitty [1641]
User ID:             501

Date/Time:           2025-12-15 13:22:02.0660 +0800
Launch Time:         2025-12-15 13:19:05.0166 +0800
Hardware Model:      Mac15,6
OS Version:          macOS 26.2 (25C56)
Release Type:        User

Crash Reporter Key:  99D0DBA3-8F1E-6B1E-2185-85575A096575
Incident Identifier: 256DCEA1-9E89-4612-8000-F0C15B122A64

Time Awake Since Boot: 4100 seconds

System Integrity Protection: enabled

Triggered by Thread: 0, Dispatch Queue: com.apple.main-thread

Exception Type:    EXC_BAD_ACCESS (SIGKILL (Code Signature Invalid))
Exception Subtype: UNKNOWN_0x32 at 0x0000000108ce0000
Exception Codes:   0x0000000000000032, 0x0000000108ce0000

Termination Reason:  Namespace CODESIGNING, Code 2, Invalid Page


VM Region Info: 0x108ce0000 is in 0x108ce0000-0x108e3c000;  bytes after start: 0  bytes before end: 1425407
      REGION TYPE                    START - END         [ VSIZE] PRT/MAX SHRMOD  REGION DETAIL
      __LINKEDIT                  108cdc000-108ce0000    [   16K] r--/rwx SM=COW  /Users/USER/*/vimdoc.so
--->  mapped file                 108ce0000-108e3c000    [ 1392K] r--/rwx SM=COW  Object_id=802586a4
      GAP OF 0x407c4000 BYTES
      MALLOC metadata             149600000-149604000    [   16K] rw-/rwx SM=PRV

Thread 0 Crashed::  Dispatch queue: com.apple.main-thread
0   dyld                          	       0x1840cad54 mach_o::Universal::isUniversal(std::__1::span<unsigned char const, 18446744073709551615ul>) + 16
1   dyld                          	       0x18409d0dc dyld3::MachOFile::compatibleSlice(Diagnostics&, unsigned long long&, unsigned long long&, void const*, unsigned long, char const*, mach_o::Platform, bool, mach_o::GradedArchitectures const&, bool) + 100
2   dyld                          	       0x1840739c0 dyld4::JustInTimeLoader::makeJustInTimeLoaderDisk(Diagnostics&, dyld4::RuntimeState&, char const*, dyld4::Loader::LoadOptions const&, bool, unsigned int, mach_o::Layout const*) + 260
3   dyld                          	       0x184066638 dyld4::Loader::makeDiskLoader(Diagnostics&, dyld4::RuntimeState&, char const*, dyld4::Loader::LoadOptions const&, bool, unsigned int, mach_o::Layout const*) + 176
4   dyld                          	       0x184068068 invocation function for block in dyld4::Loader::getLoader(Diagnostics&, dyld4::RuntimeState&, char const*, dyld4::Loader::LoadOptions const&) + 2892
5   dyld                          	       0x184066d60 dyld4::Loader::forEachResolvedAtPathVar(dyld4::RuntimeState&, char const*, dyld4::Loader::LoadOptions const&, dyld4::ProcessConfig::PathOverrides::Type, bool&, void (char const*, dyld4::ProcessConfig::PathOverrides::Type, bool&) block_pointer) + 764
6   dyld                          	       0x184051948 dyld4::ProcessConfig::PathOverrides::forEachPathVariant(char const*, mach_o::Platform, bool, bool, bool&, void (char const*, dyld4::ProcessConfig::PathOverrides::Type, bool&) block_pointer) const + 1824
7   dyld                          	       0x1840668a0 dyld4::Loader::forEachPath(Diagnostics&, dyld4::RuntimeState&, char const*, dyld4::Loader::LoadOptions const&, void (char const*, dyld4::ProcessConfig::PathOverrides::Type, bool&) block_pointer) + 260
8   dyld                          	       0x184067140 dyld4::Loader::getLoader(Diagnostics&, dyld4::RuntimeState&, char const*, dyld4::Loader::LoadOptions const&) + 928
9   dyld                          	       0x18408feac dyld4::APIs::dlopen_from(char const*, int, void*)::$_0::operator()() const::'lambda'()::operator()() const + 280
10  dyld                          	       0x18408fd20 void dyld4::RuntimeLocks::withLoadersWriteLockAndProtectedStack<dyld4::APIs::dlopen_from(char const*, int, void*)::$_0::operator()() const::'lambda'()>(dyld4::APIs::dlopen_from(char const*, int, void*)::$_0::operator()() const::'lambda'())::'lambda'()::operator()() const + 192
11  dyld                          	       0x18408f740 dyld4::APIs::dlopen_from(char const*, int, void*)::$_0::operator()() const + 944
12  dyld                          	       0x18408436c dyld4::APIs::dlopen_from(char const*, int, void*) + 1104
13  dyld                          	       0x184083e70 dyld4::APIs::dlopen(char const*, int) + 128
14  libuv.1.dylib                 	       0x1012b89c8 uv_dlopen + 40
15  nvim                          	       0x100e1fc9c add_language + 300
16  libluajit-5.1.2.1.1763148144.dylib	       0x10133affc 0x101338000 + 12284
17  libluajit-5.1.2.1.1763148144.dylib	       0x101347d60 lua_pcall + 152
18  nvim                          	       0x100e19c04 nlua_exec + 240
19  nvim                          	       0x100daeba0 ex_checkhealth + 224
20  nvim                          	       0x100da8ec4 execute_cmd0 + 244
21  nvim                          	       0x100da588c do_cmdline + 8968
22  nvim                          	       0x100e6bcc4 nv_colon + 376
23  nvim                          	       0x100e69778 normal_execute + 5072
24  nvim                          	       0x100f01ffc state_enter + 372
25  nvim                          	       0x100e274c0 main + 10832
26  dyld                          	       0x18404dd54 start + 7184

Thread 1:: libuv-worker
0   libsystem_kernel.dylib        	       0x1843d64f8 __psynch_cvwait + 8
1   libsystem_pthread.dylib       	       0x1844160dc _pthread_cond_wait + 984
2   libuv.1.dylib                 	       0x1012c280c uv_cond_wait + 40
3   libuv.1.dylib                 	       0x1012b3268 worker + 496
4   libsystem_pthread.dylib       	       0x184415c08 _pthread_start + 136
5   libsystem_pthread.dylib       	       0x184410ba8 thread_start + 8

Thread 2:: libuv-worker
0   libsystem_kernel.dylib        	       0x1843d64f8 __psynch_cvwait + 8
1   libsystem_pthread.dylib       	       0x1844160dc _pthread_cond_wait + 984
2   libuv.1.dylib                 	       0x1012c280c uv_cond_wait + 40
3   libuv.1.dylib                 	       0x1012b3268 worker + 496
4   libsystem_pthread.dylib       	       0x184415c08 _pthread_start + 136
5   libsystem_pthread.dylib       	       0x184410ba8 thread_start + 8

Thread 3:: libuv-worker
0   libsystem_kernel.dylib        	       0x1843d64f8 __psynch_cvwait + 8
1   libsystem_pthread.dylib       	       0x1844160dc _pthread_cond_wait + 984
2   libuv.1.dylib                 	       0x1012c280c uv_cond_wait + 40
3   libuv.1.dylib                 	       0x1012b3268 worker + 496
4   libsystem_pthread.dylib       	       0x184415c08 _pthread_start + 136
5   libsystem_pthread.dylib       	       0x184410ba8 thread_start + 8

Thread 4:: libuv-worker
0   libsystem_kernel.dylib        	       0x1843d64f8 __psynch_cvwait + 8
1   libsystem_pthread.dylib       	       0x1844160dc _pthread_cond_wait + 984
2   libuv.1.dylib                 	       0x1012c280c uv_cond_wait + 40
3   libuv.1.dylib                 	       0x1012b3268 worker + 496
4   libsystem_pthread.dylib       	       0x184415c08 _pthread_start + 136
5   libsystem_pthread.dylib       	       0x184410ba8 thread_start + 8

Thread 5:
0   libsystem_kernel.dylib        	       0x1843d2c34 mach_msg2_trap + 8
1   libsystem_kernel.dylib        	       0x1843e5028 mach_msg2_internal + 76
2   libsystem_kernel.dylib        	       0x1843db98c mach_msg_overwrite + 484
3   libsystem_kernel.dylib        	       0x1843d2fb4 mach_msg + 24
4   CoreFoundation                	       0x1844b4ba0 __CFRunLoopServiceMachPort + 160
5   CoreFoundation                	       0x1844b34f8 __CFRunLoopRun + 1188
6   CoreFoundation                	       0x18456de34 _CFRunLoopRunSpecificWithOptions + 532
7   CoreFoundation                	       0x184506a40 CFRunLoopRun + 64
8   libuv.1.dylib                 	       0x1012c626c uv__cf_loop_runner + 88
9   libsystem_pthread.dylib       	       0x184415c08 _pthread_start + 136
10  libsystem_pthread.dylib       	       0x184410ba8 thread_start + 8

Thread 6:


Thread 0 crashed with ARM Thread State (64-bit):
    x0: 0x0000000108ce0000   x1: 0x0000000000158bc8   x2: 0x000000016f12f898   x3: 0x0000000108ce0000
    x4: 0x0000000000158bc8   x5: 0x0000000107e78698   x6: 0x000000016f12f9d0   x7: 0x0000000000000000
    x8: 0x9db4dd4c5ad400f3   x9: 0x00000001f291b4d8  x10: 0x0000000001000014  x11: 0x0000000000000001
   x12: 0x0000000107e7869a  x13: 0x0000000000000000  x14: 0x00000002a6767476  x15: 0xfffffffffffffff7
   x16: 0x000000000000005c  x17: 0x0000000184048f60  x18: 0x0000000000000000  x19: 0x000000016f12ff08
   x20: 0x0000000108ce0000  x21: 0x0000000107e78698  x22: 0x0000000000000000  x23: 0x000000016f12f9d0
   x24: 0x00000001f291b4d8  x25: 0x0000000108ce0000  x26: 0x000000016f12f898  x27: 0x000000016f12f8a0
   x28: 0x0000000000158bc8   fp: 0x000000016f12f830   lr: 0x000000018409d0dc
    sp: 0x000000016f12f5a0   pc: 0x00000001840cad54 cpsr: 0x20001000
   far: 0x0000000108ce0000  esr: 0x92000007 (Data Abort) byte read Translation fault

Binary Images:
       0x100ccc000 -        0x100feffff nvim (*) <86100d72-5eeb-35ad-94d1-a1fe80d57bb6> /opt/homebrew/*/nvim
       0x101108000 -        0x101127fff libluv.1.51.0.dylib (*) <5eb65142-044d-3ffa-bbfd-a3eb072a474c> /opt/homebrew/*/libluv.1.51.0.dylib
       0x1010e8000 -        0x1010effff lpeg.so (*) <c5a7ac4d-299e-3d62-a91f-79afdf132ea2> /opt/homebrew/*/lpeg.so
       0x101178000 -        0x101197fff libtree-sitter.0.25.dylib (*) <74cd8d69-dceb-3b55-a5ce-f1f722f32735> /opt/homebrew/*/libtree-sitter.0.25.dylib
       0x101140000 -        0x101147fff libunibilium.4.dylib (*) <a2573a78-8bee-39c5-a8d4-5b85f6175d9a> /opt/homebrew/*/libunibilium.4.dylib
       0x101214000 -        0x10126bfff libutf8proc.3.dylib (*) <5ae149ba-cbc3-3a47-b5f8-319d97d80900> /opt/homebrew/*/libutf8proc.3.dylib
       0x101278000 -        0x10129ffff libintl.8.dylib (*) <4fbeeaca-81e4-303f-840e-2014b4b1b057> /opt/homebrew/*/libintl.8.dylib
       0x101338000 -        0x1013abfff libluajit-5.1.2.1.1763148144.dylib (*) <9bc39bec-4be1-341f-bad0-93d086bddcca> /opt/homebrew/*/libluajit-5.1.2.1.1763148144.dylib
       0x1012b0000 -        0x1012cffff libuv.1.dylib (*) <2d1dcb23-d4e7-339f-b898-62b353bbe21e> /opt/homebrew/*/libuv.1.dylib
       0x1067f0000 -        0x1067fffff lua.so (*) <9c42e074-7fad-3d38-b665-97a9433a88e0> /Users/USER/*/lua.so
       0x106550000 -        0x106557fff regex.so (*) <42e8961d-a5fe-3799-8c6c-dcac223ea4a9> /Users/USER/*/regex.so
       0x106060000 -        0x106063fff gitignore.so (*) <f2ce85df-e0c5-3dca-822a-3201c0b6f5e7> /Users/USER/*/gitignore.so
       0x108538000 -        0x108753fff libblink_cmp_fuzzy.dylib (*) <9ac679c6-7fb9-3c38-a0d0-f787100d6a2b> /Users/USER/*/libblink_cmp_fuzzy.dylib
       0x108380000 -        0x1084abfff vim.so (*) <bc3154a5-de8b-33e3-8f58-b839fc8099f2> /Users/USER/*/vim.so
       0x108ca4000 -        0x108cd7fff vimdoc.so (*) <3d5ec7a5-1df8-3b25-af0a-96ff957565c1> /Users/USER/*/vimdoc.so
       0x184045000 -        0x1840e3fc3 dyld (*) <0975afba-c46b-364c-bd84-a75daa9e455a> /usr/lib/dyld
               0x0 - 0xffffffffffffffff ??? (*) <00000000-0000-0000-0000-000000000000> ???
       0x1843d2000 -        0x18440e49f libsystem_kernel.dylib (*) <548c45c8-9733-3f0d-8ef4-c06df1df2ad0> /usr/lib/system/libsystem_kernel.dylib
       0x18440f000 -        0x18441babb libsystem_pthread.dylib (*) <527c4ba0-91a5-378b-b3e2-d38269ca5a66> /usr/lib/system/libsystem_pthread.dylib
       0x184455000 -        0x18499dc3f com.apple.CoreFoundation (6.9) <649000a2-3eb4-3cf5-970a-d3cb37b5780c> /System/Library/Frameworks/CoreFoundation.framework/Versions/A/CoreFoundation

External Modification Summary:
  Calls made by other processes targeting this process:
    task_for_pid: 1
    thread_create: 0
    thread_set_state: 0
  Calls made by this process:
    task_for_pid: 0
    thread_create: 0
    thread_set_state: 0
  Calls made by all processes on this machine:
    task_for_pid: 707
    thread_create: 0
    thread_set_state: 0

VM Region Summary:
ReadOnly portion of Libraries: Total=877.8M resident=0K(0%) swapped_out_or_unallocated=877.8M(100%)
Writable regions: Total=203.5M written=369K(0%) resident=369K(0%) swapped_out=0K(0%) unallocated=203.2M(100%)

                                VIRTUAL   REGION
REGION TYPE                        SIZE    COUNT (non-coalesced)
===========                     =======  =======
Activity Tracing                   256K        1
Kernel Alloc Once                   32K        1
MALLOC                           112.8M       19
MALLOC guard page                 3296K        4
SQLite page cache                  896K        7
STACK GUARD                       56.1M        7
Stack                             48.7M        7
VM_ALLOCATE                       40.6M      323
__AUTH                            1295K      141
__AUTH_CONST                      17.0M      330
__CTF                               824        1
__DATA                            4355K      297
__DATA_CONST                      15.5M      344
__DATA_DIRTY                      1285K      276
__FONT_DATA                        2352        1
__LINKEDIT                       591.1M       16
__OBJC_RO                         78.4M        1
__OBJC_RW                         2570K        1
__TEXT                           286.7M      353
__TPRO_CONST                       128K        2
mapped file                       3488K        4
page table in kernel               369K        1
shared memory                       48K        2
===========                     =======  =======
TOTAL                              1.2G     2139


-----------
Full Report
-----------

{"app_name":"nvim","timestamp":"2025-12-15 13:22:02.00 +0800","app_version":"","slice_uuid":"86100d72-5eeb-35ad-94d1-a1fe80d57bb6","build_version":"","platform":1,"share_with_app_devs":0,"is_first_party":1,"bug_type":"309","os_version":"macOS 26.2 (25C56)","roots_installed":0,"incident_id":"256DCEA1-9E89-4612-8000-F0C15B122A64","name":"nvim"}
{
  "uptime" : 4100,
  "procRole" : "Default",
  "version" : 2,
  "userID" : 501,
  "deployVersion" : 210,
  "modelCode" : "Mac15,6",
  "coalitionID" : 1158,
  "osVersion" : {
    "train" : "macOS 26.2",
    "build" : "25C56",
    "releaseType" : "User"
  },
  "captureTime" : "2025-12-15 13:22:02.0660 +0800",
  "codeSigningMonitor" : 2,
  "incident" : "256DCEA1-9E89-4612-8000-F0C15B122A64",
  "pid" : 3450,
  "translated" : false,
  "cpuType" : "ARM-64",
  "procLaunch" : "2025-12-15 13:19:05.0166 +0800",
  "procStartAbsTime" : 94640008783,
  "procExitAbsTime" : 98889148713,
  "procName" : "nvim",
  "procPath" : "\/opt\/homebrew\/*\/nvim",
  "parentProc" : "nvim",
  "parentPid" : 3447,
  "coalitionName" : "net.kovidgoyal.kitty",
  "crashReporterKey" : "99D0DBA3-8F1E-6B1E-2185-85575A096575",
  "appleIntelligenceStatus" : {"reasons":["regionIneligible","countryBillingIneligible","countryLocationIneligible"],"state":"unavailable"},
  "developerMode" : 1,
  "responsiblePid" : 1641,
  "responsibleProc" : "kitty",
  "codeSigningID" : "nvim-5555494486100d725eeb35ad94d1a1fe80d57bb6",
  "codeSigningTeamID" : "",
  "codeSigningFlags" : 587203104,
  "codeSigningValidationCategory" : 0,
  "codeSigningTrustLevel" : 4294967295,
  "codeSigningAuxiliaryInfo" : 0,
  "instructionByteStream" : {"beforePC":"IdQRkcI0\/5f9e0Kp9E9Bqf\/DAJH\/D1\/WPyAA8WIAAFQAAIDSwANf1g==","atPC":"CABAuQh5BxJJ2Z9SSde3ch8BCWsAAJ+awANf1n8jA9X8b72p9E8BqQ=="},
  "bootSessionUUID" : "E4551285-07C3-4479-B8B3-68D9B280C392",
  "sip" : "enabled",
  "vmRegionInfo" : "0x108ce0000 is in 0x108ce0000-0x108e3c000;  bytes after start: 0  bytes before end: 1425407\n      REGION TYPE                    START - END         [ VSIZE] PRT\/MAX SHRMOD  REGION DETAIL\n      __LINKEDIT                  108cdc000-108ce0000    [   16K] r--\/rwx SM=COW  \/Users\/USER\/*\/vimdoc.so\n--->  mapped file                 108ce0000-108e3c000    [ 1392K] r--\/rwx SM=COW  Object_id=802586a4\n      GAP OF 0x407c4000 BYTES\n      MALLOC metadata             149600000-149604000    [   16K] rw-\/rwx SM=PRV  ",
  "exception" : {"codes":"0x0000000000000032, 0x0000000108ce0000","rawCodes":[50,4442685440],"type":"EXC_BAD_ACCESS","signal":"SIGKILL (Code Signature Invalid)","subtype":"UNKNOWN_0x32 at 0x0000000108ce0000"},
  "termination" : {"flags":0,"code":2,"namespace":"CODESIGNING","indicator":"Invalid Page"},
  "vmregioninfo" : "0x108ce0000 is in 0x108ce0000-0x108e3c000;  bytes after start: 0  bytes before end: 1425407\n      REGION TYPE                    START - END         [ VSIZE] PRT\/MAX SHRMOD  REGION DETAIL\n      __LINKEDIT                  108cdc000-108ce0000    [   16K] r--\/rwx SM=COW  \/Users\/USER\/*\/vimdoc.so\n--->  mapped file                 108ce0000-108e3c000    [ 1392K] r--\/rwx SM=COW  Object_id=802586a4\n      GAP OF 0x407c4000 BYTES\n      MALLOC metadata             149600000-149604000    [   16K] rw-\/rwx SM=PRV  ",
  "extMods" : {"caller":{"thread_create":0,"thread_set_state":0,"task_for_pid":0},"system":{"thread_create":0,"thread_set_state":0,"task_for_pid":707},"targeted":{"thread_create":0,"thread_set_state":0,"task_for_pid":1},"warnings":0},
  "faultingThread" : 0,
  "threads" : [{"triggered":true,"id":251570,"threadState":{"x":[{"value":4442685440},{"value":1412040},{"value":6158481560},{"value":4442685440},{"value":1412040},{"value":4427581080},{"value":6158481872},{"value":0},{"value":11363951079773700339},{"value":8364602584,"symbolLocation":0,"symbol":"mach_o::GradedArchitectures::load_arm64e_keysOff"},{"value":16777236},{"value":1},{"value":4427581082},{"value":0},{"value":11382715510},{"value":18446744073709551607},{"value":92},{"value":6509858656,"symbolLocation":56,"symbol":"fcntl"},{"value":0},{"value":6158483208},{"value":4442685440},{"value":4427581080},{"value":0},{"value":6158481872},{"value":8364602584,"symbolLocation":0,"symbol":"mach_o::GradedArchitectures::load_arm64e_keysOff"},{"value":4442685440},{"value":6158481560},{"value":6158481568},{"value":1412040}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6510203100},"cpsr":{"value":536875008},"fp":{"value":6158481456},"sp":{"value":6158480800},"esr":{"value":2449473543,"description":"(Data Abort) byte read Translation fault"},"pc":{"value":6510390612,"matchesCrashFrame":1},"far":{"value":4442685440}},"queue":"com.apple.main-thread","frames":[{"imageOffset":548180,"symbol":"mach_o::Universal::isUniversal(std::__1::span<unsigned char const, 18446744073709551615ul>)","symbolLocation":16,"imageIndex":15},{"imageOffset":360668,"symbol":"dyld3::MachOFile::compatibleSlice(Diagnostics&, unsigned long long&, unsigned long long&, void const*, unsigned long, char const*, mach_o::Platform, bool, mach_o::GradedArchitectures const&, bool)","symbolLocation":100,"imageIndex":15},{"imageOffset":190912,"symbol":"dyld4::JustInTimeLoader::makeJustInTimeLoaderDisk(Diagnostics&, dyld4::RuntimeState&, char const*, dyld4::Loader::LoadOptions const&, bool, unsigned int, mach_o::Layout const*)","symbolLocation":260,"imageIndex":15},{"imageOffset":136760,"symbol":"dyld4::Loader::makeDiskLoader(Diagnostics&, dyld4::RuntimeState&, char const*, dyld4::Loader::LoadOptions const&, bool, unsigned int, mach_o::Layout const*)","symbolLocation":176,"imageIndex":15},{"imageOffset":143464,"symbol":"invocation function for block in dyld4::Loader::getLoader(Diagnostics&, dyld4::RuntimeState&, char const*, dyld4::Loader::LoadOptions const&)","symbolLocation":2892,"imageIndex":15},{"imageOffset":138592,"symbol":"dyld4::Loader::forEachResolvedAtPathVar(dyld4::RuntimeState&, char const*, dyld4::Loader::LoadOptions const&, dyld4::ProcessConfig::PathOverrides::Type, bool&, void (char const*, dyld4::ProcessConfig::PathOverrides::Type, bool&) block_pointer)","symbolLocation":764,"imageIndex":15},{"imageOffset":51528,"symbol":"dyld4::ProcessConfig::PathOverrides::forEachPathVariant(char const*, mach_o::Platform, bool, bool, bool&, void (char const*, dyld4::ProcessConfig::PathOverrides::Type, bool&) block_pointer) const","symbolLocation":1824,"imageIndex":15},{"imageOffset":137376,"symbol":"dyld4::Loader::forEachPath(Diagnostics&, dyld4::RuntimeState&, char const*, dyld4::Loader::LoadOptions const&, void (char const*, dyld4::ProcessConfig::PathOverrides::Type, bool&) block_pointer)","symbolLocation":260,"imageIndex":15},{"imageOffset":139584,"symbol":"dyld4::Loader::getLoader(Diagnostics&, dyld4::RuntimeState&, char const*, dyld4::Loader::LoadOptions const&)","symbolLocation":928,"imageIndex":15},{"imageOffset":306860,"symbol":"dyld4::APIs::dlopen_from(char const*, int, void*)::$_0::operator()() const::'lambda'()::operator()() const","symbolLocation":280,"imageIndex":15},{"imageOffset":306464,"symbol":"void dyld4::RuntimeLocks::withLoadersWriteLockAndProtectedStack<dyld4::APIs::dlopen_from(char const*, int, void*)::$_0::operator()() const::'lambda'()>(dyld4::APIs::dlopen_from(char const*, int, void*)::$_0::operator()() const::'lambda'())::'lambda'()::operator()() const","symbolLocation":192,"imageIndex":15},{"imageOffset":304960,"symbol":"dyld4::APIs::dlopen_from(char const*, int, void*)::$_0::operator()() const","symbolLocation":944,"imageIndex":15},{"imageOffset":258924,"symbol":"dyld4::APIs::dlopen_from(char const*, int, void*)","symbolLocation":1104,"imageIndex":15},{"imageOffset":257648,"symbol":"dyld4::APIs::dlopen(char const*, int)","symbolLocation":128,"imageIndex":15},{"imageOffset":35272,"symbol":"uv_dlopen","symbolLocation":40,"imageIndex":8},{"imageOffset":1391772,"symbol":"add_language","symbolLocation":300,"imageIndex":0},{"imageOffset":12284,"imageIndex":7},{"imageOffset":64864,"symbol":"lua_pcall","symbolLocation":152,"imageIndex":7},{"imageOffset":1367044,"symbol":"nlua_exec","symbolLocation":240,"imageIndex":0},{"imageOffset":928672,"symbol":"ex_checkhealth","symbolLocation":224,"imageIndex":0},{"imageOffset":904900,"symbol":"execute_cmd0","symbolLocation":244,"imageIndex":0},{"imageOffset":891020,"symbol":"do_cmdline","symbolLocation":8968,"imageIndex":0},{"imageOffset":1703108,"symbol":"nv_colon","symbolLocation":376,"imageIndex":0},{"imageOffset":1693560,"symbol":"normal_execute","symbolLocation":5072,"imageIndex":0},{"imageOffset":2318332,"symbol":"state_enter","symbolLocation":372,"imageIndex":0},{"imageOffset":1422528,"symbol":"main","symbolLocation":10832,"imageIndex":0},{"imageOffset":36180,"symbol":"start","symbolLocation":7184,"imageIndex":15}]},{"id":251608,"name":"libuv-worker","threadState":{"x":[{"value":4},{"value":0},{"value":2304},{"value":0},{"value":0},{"value":164},{"value":0},{"value":0},{"value":6166916808},{"value":0},{"value":0},{"value":2},{"value":2},{"value":0},{"value":0},{"value":0},{"value":305},{"value":8364443976},{"value":0},{"value":4314710504,"symbolLocation":0,"symbol":"mutex"},{"value":4314710568,"symbolLocation":0,"symbol":"cond"},{"value":6166917344},{"value":0},{"value":0},{"value":2304},{"value":2304},{"value":3328},{"value":4430862536},{"value":4314710648,"symbolLocation":0,"symbol":"wq"}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6513844444},"cpsr":{"value":1610616832},"fp":{"value":6166916928},"sp":{"value":6166916784},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6513583352},"far":{"value":0}},"frames":[{"imageOffset":17656,"symbol":"__psynch_cvwait","symbolLocation":8,"imageIndex":17},{"imageOffset":28892,"symbol":"_pthread_cond_wait","symbolLocation":984,"imageIndex":18},{"imageOffset":75788,"symbol":"uv_cond_wait","symbolLocation":40,"imageIndex":8},{"imageOffset":12904,"symbol":"worker","symbolLocation":496,"imageIndex":8},{"imageOffset":27656,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":18},{"imageOffset":7080,"symbol":"thread_start","symbolLocation":8,"imageIndex":18}]},{"id":251609,"name":"libuv-worker","threadState":{"x":[{"value":4},{"value":0},{"value":2560},{"value":0},{"value":0},{"value":164},{"value":0},{"value":0},{"value":6175354568},{"value":0},{"value":0},{"value":2},{"value":2},{"value":0},{"value":0},{"value":0},{"value":305},{"value":8364443976},{"value":0},{"value":4314710504,"symbolLocation":0,"symbol":"mutex"},{"value":4314710568,"symbolLocation":0,"symbol":"cond"},{"value":6175355104},{"value":0},{"value":0},{"value":2560},{"value":2560},{"value":3584},{"value":4430572768},{"value":4314710648,"symbolLocation":0,"symbol":"wq"}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6513844444},"cpsr":{"value":1610616832},"fp":{"value":6175354688},"sp":{"value":6175354544},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6513583352},"far":{"value":0}},"frames":[{"imageOffset":17656,"symbol":"__psynch_cvwait","symbolLocation":8,"imageIndex":17},{"imageOffset":28892,"symbol":"_pthread_cond_wait","symbolLocation":984,"imageIndex":18},{"imageOffset":75788,"symbol":"uv_cond_wait","symbolLocation":40,"imageIndex":8},{"imageOffset":12904,"symbol":"worker","symbolLocation":496,"imageIndex":8},{"imageOffset":27656,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":18},{"imageOffset":7080,"symbol":"thread_start","symbolLocation":8,"imageIndex":18}]},{"id":251610,"name":"libuv-worker","threadState":{"x":[{"value":4},{"value":0},{"value":2816},{"value":0},{"value":0},{"value":164},{"value":0},{"value":0},{"value":6183792328},{"value":0},{"value":0},{"value":2},{"value":2},{"value":0},{"value":0},{"value":0},{"value":305},{"value":8364443976},{"value":0},{"value":4314710504,"symbolLocation":0,"symbol":"mutex"},{"value":4314710568,"symbolLocation":0,"symbol":"cond"},{"value":6183792864},{"value":0},{"value":0},{"value":2816},{"value":2816},{"value":3840},{"value":4430531528},{"value":4314710648,"symbolLocation":0,"symbol":"wq"}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6513844444},"cpsr":{"value":1610616832},"fp":{"value":6183792448},"sp":{"value":6183792304},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6513583352},"far":{"value":0}},"frames":[{"imageOffset":17656,"symbol":"__psynch_cvwait","symbolLocation":8,"imageIndex":17},{"imageOffset":28892,"symbol":"_pthread_cond_wait","symbolLocation":984,"imageIndex":18},{"imageOffset":75788,"symbol":"uv_cond_wait","symbolLocation":40,"imageIndex":8},{"imageOffset":12904,"symbol":"worker","symbolLocation":496,"imageIndex":8},{"imageOffset":27656,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":18},{"imageOffset":7080,"symbol":"thread_start","symbolLocation":8,"imageIndex":18}]},{"id":251611,"name":"libuv-worker","threadState":{"x":[{"value":260},{"value":0},{"value":2048},{"value":0},{"value":0},{"value":164},{"value":0},{"value":0},{"value":6192230088},{"value":0},{"value":0},{"value":2},{"value":2},{"value":0},{"value":0},{"value":0},{"value":305},{"value":8364443976},{"value":0},{"value":4314710504,"symbolLocation":0,"symbol":"mutex"},{"value":4314710568,"symbolLocation":0,"symbol":"cond"},{"value":6192230624},{"value":0},{"value":0},{"value":2048},{"value":2048},{"value":3072},{"value":4431076000},{"value":4314710648,"symbolLocation":0,"symbol":"wq"}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6513844444},"cpsr":{"value":1610616832},"fp":{"value":6192230208},"sp":{"value":6192230064},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6513583352},"far":{"value":0}},"frames":[{"imageOffset":17656,"symbol":"__psynch_cvwait","symbolLocation":8,"imageIndex":17},{"imageOffset":28892,"symbol":"_pthread_cond_wait","symbolLocation":984,"imageIndex":18},{"imageOffset":75788,"symbol":"uv_cond_wait","symbolLocation":40,"imageIndex":8},{"imageOffset":12904,"symbol":"worker","symbolLocation":496,"imageIndex":8},{"imageOffset":27656,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":18},{"imageOffset":7080,"symbol":"thread_start","symbolLocation":8,"imageIndex":18}]},{"id":251626,"frames":[{"imageOffset":3124,"symbol":"mach_msg2_trap","symbolLocation":8,"imageIndex":17},{"imageOffset":77864,"symbol":"mach_msg2_internal","symbolLocation":76,"imageIndex":17},{"imageOffset":39308,"symbol":"mach_msg_overwrite","symbolLocation":484,"imageIndex":17},{"imageOffset":4020,"symbol":"mach_msg","symbolLocation":24,"imageIndex":17},{"imageOffset":392096,"symbol":"__CFRunLoopServiceMachPort","symbolLocation":160,"imageIndex":19},{"imageOffset":386296,"symbol":"__CFRunLoopRun","symbolLocation":1188,"imageIndex":19},{"imageOffset":1150516,"symbol":"_CFRunLoopRunSpecificWithOptions","symbolLocation":532,"imageIndex":19},{"imageOffset":727616,"symbol":"CFRunLoopRun","symbolLocation":64,"imageIndex":19},{"imageOffset":90732,"symbol":"uv__cf_loop_runner","symbolLocation":88,"imageIndex":8},{"imageOffset":27656,"symbol":"_pthread_start","symbolLocation":136,"imageIndex":18},{"imageOffset":7080,"symbol":"thread_start","symbolLocation":8,"imageIndex":18}],"threadState":{"x":[{"value":268451845},{"value":21592279046},{"value":8589934592,"objc-selector":""},{"value":37396280246272},{"value":0},{"value":37396280246272},{"value":2},{"value":4294967295},{"value":0},{"value":17179869184},{"value":0},{"value":2},{"value":0},{"value":0},{"value":8707},{"value":0},{"value":18446744073709551569},{"value":8364445856},{"value":0},{"value":4294967295},{"value":2},{"value":37396280246272},{"value":0},{"value":37396280246272},{"value":6200647752},{"value":8589934592,"objc-selector":""},{"value":21592279046},{"value":18446744073709550527},{"value":4412409862}],"flavor":"ARM_THREAD_STATE64","lr":{"value":6513643560},"cpsr":{"value":4096},"fp":{"value":6200647600},"sp":{"value":6200647520},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6513568820},"far":{"value":0}}},{"id":251628,"frames":[],"threadState":{"x":[{"value":6201225216},{"value":11011},{"value":6200688640},{"value":0},{"value":409604},{"value":18446744073709551615},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}],"flavor":"ARM_THREAD_STATE64","lr":{"value":0},"cpsr":{"value":4096},"fp":{"value":0},"sp":{"value":6201225216},"esr":{"value":1442840704,"description":"(Syscall)"},"pc":{"value":6513822612},"far":{"value":0}}}],
  "usedImages" : [
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4308385792,
    "size" : 3293184,
    "uuid" : "86100d72-5eeb-35ad-94d1-a1fe80d57bb6",
    "path" : "\/opt\/homebrew\/*\/nvim",
    "name" : "nvim"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4312825856,
    "size" : 131072,
    "uuid" : "5eb65142-044d-3ffa-bbfd-a3eb072a474c",
    "path" : "\/opt\/homebrew\/*\/libluv.1.51.0.dylib",
    "name" : "libluv.1.51.0.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4312694784,
    "size" : 32768,
    "uuid" : "c5a7ac4d-299e-3d62-a91f-79afdf132ea2",
    "path" : "\/opt\/homebrew\/*\/lpeg.so",
    "name" : "lpeg.so"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4313284608,
    "size" : 131072,
    "uuid" : "74cd8d69-dceb-3b55-a5ce-f1f722f32735",
    "path" : "\/opt\/homebrew\/*\/libtree-sitter.0.25.dylib",
    "name" : "libtree-sitter.0.25.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4313055232,
    "size" : 32768,
    "uuid" : "a2573a78-8bee-39c5-a8d4-5b85f6175d9a",
    "path" : "\/opt\/homebrew\/*\/libunibilium.4.dylib",
    "name" : "libunibilium.4.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4313923584,
    "size" : 360448,
    "uuid" : "5ae149ba-cbc3-3a47-b5f8-319d97d80900",
    "path" : "\/opt\/homebrew\/*\/libutf8proc.3.dylib",
    "name" : "libutf8proc.3.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4314333184,
    "size" : 163840,
    "uuid" : "4fbeeaca-81e4-303f-840e-2014b4b1b057",
    "path" : "\/opt\/homebrew\/*\/libintl.8.dylib",
    "name" : "libintl.8.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4315119616,
    "size" : 475136,
    "uuid" : "9bc39bec-4be1-341f-bad0-93d086bddcca",
    "path" : "\/opt\/homebrew\/*\/libluajit-5.1.2.1.1763148144.dylib",
    "name" : "libluajit-5.1.2.1.1763148144.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4314562560,
    "size" : 131072,
    "uuid" : "2d1dcb23-d4e7-339f-b898-62b353bbe21e",
    "path" : "\/opt\/homebrew\/*\/libuv.1.dylib",
    "name" : "libuv.1.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4403953664,
    "size" : 65536,
    "uuid" : "9c42e074-7fad-3d38-b665-97a9433a88e0",
    "path" : "\/Users\/USER\/*\/lua.so",
    "name" : "lua.so"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4401201152,
    "size" : 32768,
    "uuid" : "42e8961d-a5fe-3799-8c6c-dcac223ea4a9",
    "path" : "\/Users\/USER\/*\/regex.so",
    "name" : "regex.so"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4396023808,
    "size" : 16384,
    "uuid" : "f2ce85df-e0c5-3dca-822a-3201c0b6f5e7",
    "path" : "\/Users\/USER\/*\/gitignore.so",
    "name" : "gitignore.so"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4434657280,
    "size" : 2211840,
    "uuid" : "9ac679c6-7fb9-3c38-a0d0-f787100d6a2b",
    "path" : "\/Users\/USER\/*\/libblink_cmp_fuzzy.dylib",
    "name" : "libblink_cmp_fuzzy.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4432855040,
    "size" : 1228800,
    "uuid" : "bc3154a5-de8b-33e3-8f58-b839fc8099f2",
    "path" : "\/Users\/USER\/*\/vim.so",
    "name" : "vim.so"
  },
  {
    "source" : "P",
    "arch" : "arm64",
    "base" : 4442439680,
    "size" : 212992,
    "uuid" : "3d5ec7a5-1df8-3b25-af0a-96ff957565c1",
    "path" : "\/Users\/USER\/*\/vimdoc.so",
    "name" : "vimdoc.so"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6509842432,
    "size" : 651204,
    "uuid" : "0975afba-c46b-364c-bd84-a75daa9e455a",
    "path" : "\/usr\/lib\/dyld",
    "name" : "dyld"
  },
  {
    "size" : 0,
    "source" : "A",
    "base" : 0,
    "uuid" : "00000000-0000-0000-0000-000000000000"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6513565696,
    "size" : 246944,
    "uuid" : "548c45c8-9733-3f0d-8ef4-c06df1df2ad0",
    "path" : "\/usr\/lib\/system\/libsystem_kernel.dylib",
    "name" : "libsystem_kernel.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6513815552,
    "size" : 51900,
    "uuid" : "527c4ba0-91a5-378b-b3e2-d38269ca5a66",
    "path" : "\/usr\/lib\/system\/libsystem_pthread.dylib",
    "name" : "libsystem_pthread.dylib"
  },
  {
    "source" : "P",
    "arch" : "arm64e",
    "base" : 6514102272,
    "CFBundleShortVersionString" : "6.9",
    "CFBundleIdentifier" : "com.apple.CoreFoundation",
    "size" : 5540928,
    "uuid" : "649000a2-3eb4-3cf5-970a-d3cb37b5780c",
    "path" : "\/System\/Library\/Frameworks\/CoreFoundation.framework\/Versions\/A\/CoreFoundation",
    "name" : "CoreFoundation",
    "CFBundleVersion" : "4201"
  }
],
  "sharedCache" : {
  "base" : 6508756992,
  "size" : 5653544960,
  "uuid" : "acb998b6-263c-3634-b0a8-ae8270a116c2"
},
  "vmSummary" : "ReadOnly portion of Libraries: Total=877.8M resident=0K(0%) swapped_out_or_unallocated=877.8M(100%)\nWritable regions: Total=203.5M written=369K(0%) resident=369K(0%) swapped_out=0K(0%) unallocated=203.2M(100%)\n\n                                VIRTUAL   REGION \nREGION TYPE                        SIZE    COUNT (non-coalesced) \n===========                     =======  ======= \nActivity Tracing                   256K        1 \nKernel Alloc Once                   32K        1 \nMALLOC                           112.8M       19 \nMALLOC guard page                 3296K        4 \nSQLite page cache                  896K        7 \nSTACK GUARD                       56.1M        7 \nStack                             48.7M        7 \nVM_ALLOCATE                       40.6M      323 \n__AUTH                            1295K      141 \n__AUTH_CONST                      17.0M      330 \n__CTF                               824        1 \n__DATA                            4355K      297 \n__DATA_CONST                      15.5M      344 \n__DATA_DIRTY                      1285K      276 \n__FONT_DATA                        2352        1 \n__LINKEDIT                       591.1M       16 \n__OBJC_RO                         78.4M        1 \n__OBJC_RW                         2570K        1 \n__TEXT                           286.7M      353 \n__TPRO_CONST                       128K        2 \nmapped file                       3488K        4 \npage table in kernel               369K        1 \nshared memory                       48K        2 \n===========                     =======  ======= \nTOTAL                              1.2G     2139 \n",
  "legacyInfo" : {
  "threadTriggered" : {
    "queue" : "com.apple.main-thread"
  }
},
  "logWritingSignature" : "5d080d89c464a3c942944fddc21fcbb4b218449f",
  "bug_type" : "309",
  "roots_installed" : 0,
  "trmStatus" : 1,
  "trialInfo" : {
  "rollouts" : [
    {
      "rolloutId" : "64c025b28b7f0e739e4fbe58",
      "factorPackIds" : [
        "657ba0a39ec5da283662e9d2"
      ],
      "deploymentId" : 240000044
    },
    {
      "rolloutId" : "6434420a89ec2e0a7a38bf5a",
      "factorPackIds" : [

      ],
      "deploymentId" : 240000011
    }
  ],
  "experiments" : [

  ]
}
}
```

## 原因

是 macOS 26.2（最新系统）的「代码签名大扫除」在搞事情。

macOS 26.2 新增了严格签名检查（之前版本可能放行，现在直接“零容忍”），升级插件后，`markdown.so` 这个文件没被正确签名，而 macOS 26.2 比以前更严格，直接把 nvim 给杀掉了（不是 nvim 崩溃，是系统强制终止进程！）

## 解决方案

清理 tree-sitter 的 site 目录：

```bash
rm -rf ~/.local/share/nvim/site
```

然后重新打开 nvim 触发 tree-sitter 插件自动重新下载全部依赖的动态链接库。
