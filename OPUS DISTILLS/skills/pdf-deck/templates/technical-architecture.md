<!-- theme: tech-code -->
<!-- transition: slide -->

# Distributed Event Stream Engine
### Next-Generation Real-Time Transaction Pipeline & Storage Architecture
<!-- layout: cover -->
<!-- kicker: Engineering Architecture Specification -->

---

<!-- layout: metrics -->
## System Scale & Target SLAs
### Core throughput and latency guarantees under peak load

- **1,500,000:** Peak events per second per cluster
- **3.8 ms:** P99 end-to-end processing latency
- **99.999%:** High availability SLA across multi-region deployment
- **Zero:** Data loss guarantee with quorum-based WAL consensus

---

<!-- layout: split -->
## Architectural Overview & Topology
### Decoupled compute and storage with log-structured durability

- **Ingress Layer:** High-speed eBPF load balancers route incoming TCP/gRPC streams to stateless worker nodes.
- **Compute Cluster:** Memory-mapped streaming workers execute stateless windowed aggregations and stateful joins.
- **Durable State:** Raft-coordinated replicated write-ahead logs (WAL) backed by local NVMe scratch disks and async S3 tiered storage.

---

<!-- layout: grid -->
## Storage Tier Hierarchy
### Multi-temperature storage optimization

- **Hot Tier (L1):** Local NVMe SSDs in RAID-0 for zero-latency write buffers and immediate point lookups (< 100 microseconds).
- **Warm Tier (L2):** Clustered memory-mapped RocksDB instances with columnar compression for 7-day query indexing.
- **Cold Tier (L3):** Parquet files on cloud object storage with Zstandard compression for historical replay and batch ML queries.

---

<!-- layout: flow -->
## Fault Tolerance & Quorum Recovery
### Automatic node failover sequence without partition stall

1. **Failure Detection:** Heartbeat loss detected via SWAN gossip protocol within 300 ms.
2. **Leader Election:** Raft candidate initiates election term; quorum attained within 450 ms.
3. **Log Reconciliation:** Follower nodes replay uncommitted log indices from the new leader.
4. **Resumed Ingestion:** Client connections transparently redirected via virtual IP hash ring.

---

<!-- layout: ending -->
## Deployment & Verification Next Steps
### Production rollout schedule and disaster recovery testing

- Chaos engineering fuzzing with Jepsen test suite (Week 1–2)
- Multi-region failover drill under synthetic 2x load (Week 3)
- Staged production traffic ramp (10% -> 50% -> 100%) (Week 4)

**Architecture Review Board:** engineering@systems.internal
