<script lang="ts">
  import Login from "$lib/Login.svelte";
  import Messages from "$lib/Messages.svelte";
  import { currentUser } from "$lib/pocketbase";
</script>

<Login />
{#if $currentUser}
  <Messages />
{/if}
