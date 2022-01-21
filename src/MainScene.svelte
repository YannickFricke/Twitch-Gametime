<script lang="ts">
    import {
        addUserVote,
        isStarted,
        isTmiConnected,
        joinedChannels,
        timeStore,
        tmiClient,
        userVotes,
    } from "./stores";
    import type { ChatUserstate } from "tmi.js";
    import { formatTime } from "./TimeFormatter";
    import { client } from "tmi.js";

    export let channelName: string;
    export let oauthToken: string;

    export let fontName: string = "Arial";
    export let fontSize: number = 30;
    export let subText: string = "Game time";

    export let duration = 60;
    export let voteTime = 5 * 60;
    export let subscribeTime = 5 * 60;

    export let startCommand = "start";
    export let pauseCommand = "pause";
    export let resetCommand = "reset";
    export let upvoteCommand = "upvote";
    export let downvoteCommand = "downvote";

    const realChannelName = `#${channelName.toLowerCase()}`;

    if ($tmiClient === undefined) {
        timeStore.set(duration);

        const newClient = client({
            identity: {
                username: channelName,
                password: oauthToken,
            },
        });

        newClient.on("connecting", () => {
            isTmiConnected.set(false);
        });

        newClient.on("connected", () => {
            isTmiConnected.set(true);
        });

        newClient.on("disconnected", () => {
            isTmiConnected.set(false);
        });

        newClient.on(
            "message",
            (
                channel: string,
                userstate: ChatUserstate,
                message: string,
                self: boolean
            ) => {
                if (realChannelName !== channel) {
                    return;
                }

                if (self) {
                    return;
                }

                if (message.startsWith("!") === false) {
                    return;
                }

                const [command] = message.substring(1).split(" ");

                switch (command) {
                    case upvoteCommand:
                        if ($isStarted === false) {
                            return;
                        }

                        addUserVote(userstate.username, voteTime);

                        break;
                    case downvoteCommand:
                        if ($isStarted === false) {
                            return;
                        }

                        addUserVote(userstate.username, -voteTime);
                        break;

                    case startCommand:
                        if (
                            userstate.badges?.broadcaster === "0" ||
                            userstate.badges?.moderator === "0"
                        ) {
                            return;
                        }

                        isStarted.set(true);
                        break;
                    case pauseCommand:
                        if (
                            userstate.badges?.broadcaster === "0" ||
                            userstate.badges?.moderator === "0"
                        ) {
                            return;
                        }

                        isStarted.set(false);
                        break;

                    case resetCommand:
                        timeStore.set(duration);
                        isStarted.set(false);
                        userVotes.set({});
                        break;

                    default:
                        break;
                }
            }
        );

        newClient.on("subscription", (channel) => {
            if (realChannelName !== channel) {
                return;
            }

            if ($isStarted === false) {
                return;
            }

            timeStore.update((currentTime) => currentTime + subscribeTime);
        });

        newClient.on("subgift", (channel) => {
            if (realChannelName !== channel) {
                return;
            }

            if ($isStarted === false) {
                return;
            }

            timeStore.update((currentTime) => currentTime + subscribeTime);
        });

        newClient.connect().then(() =>
            newClient.join(channelName).then(() => {
                joinedChannels.set([channelName]);
                tmiClient.set(newClient);
            })
        );
    }

    const normalizedFontName = fontName.includes(" ")
        ? `'${fontName}'`
        : fontName;

    setInterval(() => {
        if ($isStarted === false) {
            return;
        }

        if ($timeStore < 0) {
            timeStore.set(0);
            isStarted.set(false);
            return;
        }

        if ($timeStore === 0) {
            isStarted.set(false);
            return;
        }

        timeStore.update((oldValue) => oldValue - 1);
    }, 1000);
</script>

<div
    id="main-scene"
    style="font-family: {normalizedFontName}; font-size: {fontSize}px; text-align: center;"
>
    <div>{formatTime($timeStore)}</div>
    <div>{subText}</div>
</div>

<style>
</style>
