import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from './token_assets.did.js';
export { idlFactory } from './token_assets.did.js';

export const canisterId = process.env.TOKEN_ASSETS_CANISTER_ID;

/**
 * 
 * @param {string | import("@dfinity/principal").Principal} canisterId Canister ID of Agent
 * @param {{agentOptions?: import("@dfinity/agent").HttpAgentOptions; actorOptions?: import("@dfinity/agent").ActorConfig}} [options]
 * @return {import("@dfinity/agent").ActorSubclass<import("./token_assets.did.js")._SERVICE>}
 */
 export const createActor = (canisterId, options) => {
  const agent = new HttpAgent({ ...options?.agentOptions });
  
  if(process.env.NODE_ENV !== "production") {
    agent.fetchRootKey().catch(err=>{
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options?.actorOptions,
  });
};
  
/**
 * A ready-to-use agent for the token_assets canister
 * @type {import("@dfinity/agent").ActorSubclass<import("./token_assets.did.js")._SERVICE>}
 */
 export const token_assets = createActor(canisterId);
