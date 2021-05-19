# Deno vs. Node.js server comparison

Example Deno and Node.js server load comparison done with Autocannon.

## System information

 - Machine: `Acer Aspire V15 Nitro, 2.6 GHz two-core Intel Core i7, 8 GB DDR4`
 - Deno: `1.9.2`
 - Node: `14.16.0`

## Deno - with bcrypt

Implementation can be found [here](https://github.com/mitom18/example-server-deno).

```
10s test
100 connections
4 workers

┌─────────┬──────┬─────────┬─────────┬─────────┬────────────┬────────────┬─────────┐
│ Stat    │ 2.5% │ 50%     │ 97.5%   │ 99%     │ Avg        │ Stdev      │ Max     │
├─────────┼──────┼─────────┼─────────┼─────────┼────────────┼────────────┼─────────┤
│ Latency │ 6 ms │ 4344 ms │ 9313 ms │ 9493 ms │ 3664.71 ms │ 3405.98 ms │ 9596 ms │
└─────────┴──────┴─────────┴─────────┴─────────┴────────────┴────────────┴─────────┘
┌───────────┬─────┬──────┬─────────┬─────────┬─────────┬─────────┬─────────┐
│ Stat      │ 1%  │ 2.5% │ 50%     │ 97.5%   │ Avg     │ Stdev   │ Min     │
├───────────┼─────┼──────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Req/Sec   │ 0   │ 0    │ 21      │ 54      │ 23.4    │ 20.5    │ 21      │
├───────────┼─────┼──────┼─────────┼─────────┼─────────┼─────────┼─────────┤
│ Bytes/Sec │ 0 B │ 0 B  │ 6.39 kB │ 15.4 kB │ 6.89 kB │ 5.98 kB │ 6.39 kB │
└───────────┴─────┴──────┴─────────┴─────────┴─────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

234 requests in 10.13s, 68.8 kB read, 100 users created
```

## Deno - without bcrypt

Implementation is the same, just with commented bcrypt functionality. This test shows, that working with passwords via Web Worker API is not that fast. Better solution would probably be to use WebAssembly.

```
10s test
100 connections
4 workers

┌─────────┬──────┬────────┬─────────┬─────────┬───────────┬───────────┬─────────┐
│ Stat    │ 2.5% │ 50%    │ 97.5%   │ 99%     │ Avg       │ Stdev     │ Max     │    
├─────────┼──────┼────────┼─────────┼─────────┼───────────┼───────────┼─────────┤    
│ Latency │ 7 ms │ 872 ms │ 1852 ms │ 1924 ms │ 840.22 ms │ 527.55 ms │ 1980 ms │    
└─────────┴──────┴────────┴─────────┴─────────┴───────────┴───────────┴─────────┘    
┌───────────┬─────────┬─────────┬─────────┬─────────┬────────┬────────┬─────────┐    
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg    │ Stdev  │ Min     │    
├───────────┼─────────┼─────────┼─────────┼─────────┼────────┼────────┼─────────┤    
│ Req/Sec   │ 37      │ 37      │ 119     │ 151     │ 113.5  │ 35.09  │ 37      │    
├───────────┼─────────┼─────────┼─────────┼─────────┼────────┼────────┼─────────┤    
│ Bytes/Sec │ 3.15 kB │ 3.15 kB │ 39.3 kB │ 1.32 MB │ 260 kB │ 456 kB │ 3.15 kB │    
└───────────┴─────────┴─────────┴─────────┴─────────┴────────┴────────┴─────────┘    

Req/Bytes counts sampled once per second.

1k requests in 10.11s, 2.6 MB read, 200 users created
```

## Node.js

Implementation can be found [here](https://github.com/mitom18/example-server-nodejs).

```
10s test
100 connections
4 workers

┌─────────┬──────┬─────────┬─────────┬─────────┬───────────┬────────────┬─────────┐
│ Stat    │ 2.5% │ 50%     │ 97.5%   │ 99%     │ Avg       │ Stdev      │ Max     │
├─────────┼──────┼─────────┼─────────┼─────────┼───────────┼────────────┼─────────┤
│ Latency │ 2 ms │ 1896 ms │ 4063 ms │ 4298 ms │ 1316.3 ms │ 1342.47 ms │ 4305 ms │
└─────────┴──────┴─────────┴─────────┴─────────┴───────────┴────────────┴─────────┘
┌───────────┬─────┬──────┬─────────┬────────┬────────┬────────┬─────────┐
│ Stat      │ 1%  │ 2.5% │ 50%     │ 97.5%  │ Avg    │ Stdev  │ Min     │
├───────────┼─────┼──────┼─────────┼────────┼────────┼────────┼─────────┤
│ Req/Sec   │ 0   │ 0    │ 65      │ 141    │ 66.5   │ 42.21  │ 43      │
├───────────┼─────┼──────┼─────────┼────────┼────────┼────────┼─────────┤
│ Bytes/Sec │ 0 B │ 0 B  │ 38.7 kB │ 966 kB │ 187 kB │ 309 kB │ 18.3 kB │
└───────────┴─────┴──────┴─────────┴────────┴────────┴────────┴─────────┘

Req/Bytes counts sampled once per second.

665 requests in 10.14s, 1.87 MB read, 155 users created
```
