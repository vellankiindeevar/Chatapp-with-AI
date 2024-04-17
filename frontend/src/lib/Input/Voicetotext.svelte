<script>
  import { onMount } from "svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { AudioWaveform } from "lucide-svelte";
  import { transcript } from '../pocketbase'

  let recognition;
  // Create a writable store for transcript

  onMount(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
  });

  const runSpeechRecog = () => {
    transcript.set("Loading text...");
    recognition.onstart = () => {
      transcript.set("Listening...");
    };
    recognition.onresult = (e) => {
      transcript.set(e.results[0][0].transcript);
    };
    recognition.start();
  };
</script>

<Button variant="outline" on:click={runSpeechRecog}><AudioWaveform /></Button>
