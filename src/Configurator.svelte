<script lang="ts">
    const isConfigured = true;

    let channelName = "";
    let oauthToken = "";

    let fontName = "Arial";
    let fontSize = 20;
    let subText = "Game time";

    let duration = 60;
    let voteTime = 60;
    let subscribeTime = 60;

    let startCommand = "start";
    let pauseCommand = "pause";
    let resetCommand = "reset";
    let upvoteCommand = "upvote";
    let downvoteCommand = "downvote";

    $: if (fontSize === null || fontSize < 1) {
        fontSize = 1;
    }

    $: if (duration === null || duration < 1) {
        duration = 1;
    }

    $: if (voteTime === null || voteTime < 1) {
        voteTime = 1;
    }

    $: if (subscribeTime === null || subscribeTime < 1) {
        subscribeTime = 1;
    }

    function stringify(obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(
                    encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
                );
            }
        return str.join("&");
    }

    $: url =
        location.protocol +
        "//" +
        location.host +
        location.pathname +
        "?" +
        stringify({
            isConfigured,
            channelName,
            oauthToken,
            fontName,
            fontSize,
            subText,
            duration,
            voteTime,
            subscribeTime,
            startCommand,
            pauseCommand,
            upvoteCommand,
            downvoteCommand,
        });

    function copyToClipboard() {
        navigator.clipboard.writeText(url);
        alert("URL copied to clipboard");
    }
</script>

<div id="configurator">
    <h1>Configurator</h1>

    <div>
        ATTENTION! No data will be saved on the server - everything happens in
        your browser! Your OAuth token always stays secure! :)
    </div>

    <div class="options">
        <div>Channel Name</div>
        <div>
            <input type="text" bind:value={channelName} />
        </div>
        <div>
            OAuth Token (get your token <a href="https://twitchapps.com/tmi/"
                >here</a
            >) (ATTENTION: You need to copy everything out of the textbox -
            including the leading "oauth:"! Otherwise the bot can't work)
        </div>
        <div>
            <input type="text" bind:value={oauthToken} />
        </div>
        <div>Font (choose any font which is installed on your system)</div>
        <div>
            <input type="text" bind:value={fontName} />
        </div>
        <div>Font size (in pixels)</div>
        <div>
            <input type="number" bind:value={fontSize} />
        </div>
        <div>Sub Text (the text below the timer)</div>
        <div>
            <input type="text" bind:value={subText} />
        </div>

        <div>
            Play duration (in seconds) (How long do you wanna play the game?)
        </div>
        <div>
            <input type="number" bind:value={duration} />
        </div>
        <div>Time each vote adds or substracts (in seconds)</div>
        <div>
            <input type="number" bind:value={voteTime} />
        </div>
        <div>Subscribe time (in seconds)</div>
        <div>
            <input type="number" bind:value={subscribeTime} />
        </div>

        <div>
            Start command (only useable by the broadcaster and moderators)
        </div>
        <div>
            <input type="text" bind:value={startCommand} />
        </div>
        <div>
            Pause command (only useable by the broadcaster and moderators)
        </div>
        <div>
            <input type="text" bind:value={pauseCommand} />
        </div>
        <div>
            Reset command (only useable by the broadcaster and moderators)
            (reset votes + play duration to initial value)
        </div>
        <div>
            <input type="text" bind:value={resetCommand} />
        </div>
        <div>Upvote command (useable by everyone once an hour)</div>
        <div>
            <input type="text" bind:value={upvoteCommand} />
        </div>
        <div>Downvote command (useable by everyone once an hour)</div>
        <div>
            <input type="text" bind:value={downvoteCommand} />
        </div>

        <div class="result-url" on:click={copyToClipboard}>
            <div>
                {url}
            </div>
            <div>(click to copy)</div>
        </div>
    </div>

    <div style="text-align: center; margin-top: 1rem;">
        <div>
            Hey there! I hope you like the small tool! :) If you are interested
            in coding streams, I stream from time to time on my <a
                href="https://twitch.tv/iseven">Twitch channel</a
            >!
        </div>
        <div>
            I really appreciate every new follow and maybe one day you could
            help to bring your ideas into a tool I code!
        </div>
    </div>
    <div style="text-align: center; margin-top: 1rem;">
        &copy; Yannick Fricke 2022 - today
    </div>
</div>

<style>
    #configurator {
        padding: 1rem;
    }

    .options {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    .options .result-url {
        margin-top: 1rem;
        grid-column: 1 / span 2;
        text-align: center;
    }
</style>
