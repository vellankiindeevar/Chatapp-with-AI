<script lang="ts">
  import { File } from "lucide-svelte";
  import * as Tooltip from "$lib/components/ui/tooltip";
  export let name: any;
  export let src: any;
</script>

<Tooltip.Root>
  <Tooltip.Trigger><File /></Tooltip.Trigger>
  <Tooltip.Content>
    <a href={src}>{name}</a>
  </Tooltip.Content>
</Tooltip.Root>
