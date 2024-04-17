<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  export let email: string;
  export let toolcontent = `Sent by ${email}`;
</script>

<Tooltip.Root>
  <Tooltip.Trigger>
    <!-- this is content  -->
    <Avatar.Root>
      <Avatar.Image
        src={`https://api.dicebear.com/8.x/initials/svg?radius=50&fontSize=40&seed=${email}`}
        alt={email}
      />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>
  </Tooltip.Trigger>

  <Tooltip.Content>
    <p>{toolcontent}</p>
  </Tooltip.Content>
</Tooltip.Root>
