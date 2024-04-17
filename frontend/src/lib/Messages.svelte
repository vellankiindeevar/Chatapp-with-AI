<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { currentUser, pb } from "./pocketbase";
  import Profile from "./Profile.svelte";
  import Input from "./Input/Input.svelte";
  import TopBar from "./Messages/TopBar.svelte";
  import Uploadedfile from "./Messages/Uploadedfile.svelte";

  let messages: any = [];
  let unsubscribe: () => void;
  onMount(async () => {
    // Get initial messages
    const resultList = await pb.collection("messages").getList(1, 50, {
      sort: "created",
      expand: "user",
    });
    messages = resultList.items;

    // Subscribe to realtime messages
    unsubscribe = await pb
      .collection("messages")
      .subscribe("*", async ({ action, record }) => {
        if (action === "create") {
          // Fetch associated user
          const user = await pb.collection("users").getOne(record.user);
          record.expand = { user };
          messages = [...messages, record];
        }
      });
  });

  // Unsubscribe from realtime messages
  onDestroy(() => {
    unsubscribe?.();
  });
</script>

<div class="h-screen flex justify-center items-center text-lg">
  <div class="border border-black h-[900px] w-4/6 flex flex-col p-1">
    <div class="flex-grow">
      <TopBar />
      <div class="overflow-y-auto max-h-[760px]">
        {#each messages as message (message.id)}
          {#if message.ai === true}
            <div class="flex justify-center">
              <div class="flex flex-col items-center max-w-[800px]">
                <Profile email={message.expand?.user?.email} />
                <p class="my-2 p-2 bg-green-200 rounded-md">
                  {message?.text}
                </p>
                <p class="my-2 p-2 bg-green-200 rounded-md">
                  {message?.answer}
                </p>
              </div>
            </div>
          {:else if message.expand?.user?.email === $currentUser?.email && message.text !== ""}
            <div class="flex gap-2 justify-end">
              <p class="m-2 bg-blue-200 p-2 rounded-md">{message?.text}</p>
            </div>
          {:else if message.text !== undefined && message.text !== ""}
            <div class="flex gap-2">
              <Profile email={message.expand?.user?.email} />
              <p class="my-2 p-2 bg-blue-200 rounded-md">{message?.text}</p>
            </div>
          {/if}

          {#if message.file === true}
            {#if message.expand?.user?.email === $currentUser?.email}
              <div class="flex gap-2 justify-end">
                <p class="m-2 bg-blue-200 p-2 rounded-md">
                  <Uploadedfile
                    name={message.document}
                    src={`http://127.0.0.1:8090/api/files/${message.collectionId}/${message.id}/${message.document}`}
                  />
                </p>
              </div>
            {:else}
              <div class="flex gap-2">
                <Profile email={message.expand?.user?.email} />
                <p class="my-2 p-2 bg-blue-200 rounded-md">
                  <Uploadedfile
                    name={message.document}
                    src={`http://127.0.0.1:8090/api/files/${message.collectionId}/${message.id}/${message.document}`}
                  />
                </p>
              </div>
            {/if}
          {/if}
        {/each}
      </div>
    </div>
    <Input />
  </div>
</div>
