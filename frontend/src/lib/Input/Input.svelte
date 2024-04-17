<script lang="ts">
  import { pb, currentUser } from "../pocketbase";
  import { Toggle } from "$lib/components/ui/toggle";
  import { getAI } from "./helper";
  import Uploadfile from "./Uploadfile.svelte";
  import Voicetotext from "./Voicetotext.svelte";
  import { transcript } from "../pocketbase";

  let newMessage: string;
  $: newMessage = $transcript;
  let ai = false;

  async function sendMessage() {
    let msg: string = newMessage;
    newMessage = "";
    if (ai) {
      let ans: string = await getAI(msg);
      const data = {
        text: msg,
        user: $currentUser?.id,
        answer: ans,
        ai: true,
      };
      await pb.collection("messages").create(data);
    } else {
      const data = {
        text: msg,
        user: $currentUser?.id,
      };
      await pb.collection("messages").create(data);
    }
  }
</script>

<div class="flex gap-2 p-1">
  <div class="my-auto flex gap-2">
    <Voicetotext />
    <Uploadfile />
    <Toggle bind:pressed={ai} variant="outline">AI</Toggle>
  </div>
  <form on:submit|preventDefault={sendMessage} class="w-full">
    <input
      placeholder="Message"
      type="text"
      bind:value={newMessage}
      class="border p-2 flex gap-3 w-full rounded-md"
    />
  </form>
</div>
