<script>
  import { currentUser, pb } from "../pocketbase";
  import Profile from "$lib/Profile.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";

  function logout() {
    pb.authStore.clear();
  }
</script>

<div class="flex p-2 justify-between">
  <Profile email={$currentUser?.email} toolcontent={$currentUser?.email} />
  <Button variant="outline" on:click={logout}>Logout</Button>
</div>
<Separator class="mb-1" />
