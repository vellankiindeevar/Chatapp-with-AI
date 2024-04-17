<script>
  import Button from "./components/ui/button/button.svelte";
  import { currentUser, pb } from "$lib/pocketbase";

  async function login() {
    await pb.collection("users").authWithOAuth2({ provider: "google" });
  }
</script>

{#if !$currentUser}
  <div class="h-screen flex justify-center items-center">
    <Button variant="outline" on:click={login} class="text-2xl"
      >Login with google</Button
    >
  </div>
{/if}
