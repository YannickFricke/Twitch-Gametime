import { writable } from "svelte/store";
import type { Client } from "tmi.js";

type UserVotes = Record<string, number>;

export const isStarted = writable(false);
export const timeStore = writable(60);
export const userVotes = writable<UserVotes>({});
export const joinedChannels = writable([]);

export const isTmiConnected = writable(false);
export let tmiClient = writable<Client | undefined>(undefined);

export function addUserVote(username: string, voteTime: number) {
    userVotes.update(oldVotes => {
        const lastVoteTime = oldVotes[username];

        if (lastVoteTime === undefined) {
            timeStore.update(currentTime => currentTime + voteTime);

            return {
                ...oldVotes,
                [username]: Date.now()
            }
        }

        if (lastVoteTime + (60 * 60 * 1000) > Date.now()) {
            return oldVotes;
        } else {
            timeStore.update(currentTime => currentTime + voteTime);

            return {
                ...oldVotes,
                [username]: Date.now()
            }
        }
    })
}
