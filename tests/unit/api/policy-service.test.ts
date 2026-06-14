import { describe, expect, it } from "vitest";

import { MemoryApiRepository } from "../../../src/server/api/memory-repository";
import {
  getMailboxPolicy,
  getSenderRule,
  setMailboxPolicy,
  setSenderRule,
} from "../../../src/server/api/policy-service";

const owner = `G${"A".repeat(55)}`;
const sender = `G${"B".repeat(55)}`;

describe("mailbox policy service", () => {
  it("returns contract defaults before configuration", async () => {
    const repository = new MemoryApiRepository();

    await expect(getMailboxPolicy(repository, owner)).resolves.toMatchObject({
      policy: {
        allowUnknown: false,
        minimumPostage: "0",
        requireVerified: true,
      },
      source: "default",
    });
  });

  it("persists owner policy", async () => {
    const repository = new MemoryApiRepository();
    const policy = {
      allowUnknown: true,
      minimumPostage: "250",
      requireVerified: false,
    };

    await setMailboxPolicy(repository, owner, policy);

    await expect(getMailboxPolicy(repository, owner)).resolves.toMatchObject({
      policy,
      source: "configured",
    });
  });

  it("sets and clears sender overrides", async () => {
    const repository = new MemoryApiRepository();

    await setSenderRule(repository, owner, sender, "block");
    await expect(getSenderRule(repository, owner, sender)).resolves.toMatchObject({
      rule: "block",
    });

    await setSenderRule(repository, owner, sender, "default");
    await expect(getSenderRule(repository, owner, sender)).resolves.toMatchObject({
      rule: "default",
    });
  });
});
