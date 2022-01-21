<script lang="ts">
	import Configurator from "./Configurator.svelte";
	import { getQueryVariable } from "./helper";
	import MainScene from "./MainScene.svelte";

	let isConfigured = getQueryVariable("isConfigured", "false") === "true";

	let channelName = getQueryVariable("channelName", undefined);
	let oauthToken = getQueryVariable("oauthToken", undefined);

	let fontName = getQueryVariable("fontName", undefined);
	let fontSize = parseInt(getQueryVariable("fontSize", undefined), 10);
	let subText = getQueryVariable("subText", "Game time");

	let duration = parseInt(getQueryVariable("duration", "60"), 10);
	let voteTime = parseInt(getQueryVariable("voteTime", "60"), 10);
	let subscribeTime = parseInt(getQueryVariable("subscribeTime", "60"), 10);

	let startCommand = getQueryVariable("startCommand", "start");
	let pauseCommand = getQueryVariable("pauseCommand", "pause");
	let resetCommand = getQueryVariable("resetCommand", "reset");
	let upvoteCommand = getQueryVariable("upvoteCommand", "upvote");
	let downvoteCommand = getQueryVariable("downvoteCommand", "downvote");
</script>

<main>
	{#if isConfigured}
		<MainScene
			{channelName}
			{oauthToken}
			{fontName}
			{fontSize}
			{subText}
			{duration}
			{voteTime}
			{subscribeTime}
			{startCommand}
			{pauseCommand}
			{resetCommand}
			{upvoteCommand}
			{downvoteCommand}
		/>
	{:else}
		<Configurator />
	{/if}
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: Arial, Helvetica, sans-serif;
	}
</style>
