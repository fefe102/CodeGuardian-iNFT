import { describe, expect, it } from "vitest";
import { CodeGuardian, replayCodeGuardianRun, runCodeGuardian } from "./index";

describe("CodeGuardian runtime", () => {
  it("creates a run trace", () => {
    const result = runCodeGuardian();
    expect(result.run.runId).toBe("codeguardian-run-001");
    expect(result.run.events.map((event) => event.type)).toContain("issue_found");
  });

  it("writes mutable state", () => {
    const agent = new CodeGuardian();
    const result = agent.run();
    expect(agent.state.get("memory")).toEqual(result.memory);
  });

  it("appends immutable log events", () => {
    const agent = new CodeGuardian();
    agent.run();
    expect(agent.log.events.length).toBeGreaterThanOrEqual(10);
    expect(agent.log.events[0]?.type).toBe("task_received");
  });

  it("appends a critic loop event", () => {
    const result = runCodeGuardian();
    expect(result.run.events.some((event) => event.type === "critic_completed")).toBe(true);
    expect(result.run.result.accepted).toBe(true);
  });

  it("changes the memory root after a run", () => {
    const result = runCodeGuardian();
    expect(result.memoryRootAfter).not.toEqual(result.memoryRootBefore);
  });

  it("replays events from the trace", () => {
    const result = runCodeGuardian();
    const replay = replayCodeGuardianRun(result.run);
    expect(replay.eventCount).toBe(result.run.events.length);
    expect(replay.timeline.at(-1)?.type).toBe("certificate_issued");
  });
});
