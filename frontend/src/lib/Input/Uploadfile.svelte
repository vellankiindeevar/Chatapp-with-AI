<script>
  import { pb, currentUser } from "../pocketbase";
  import * as Dialog from "$lib/components/ui/dialog";

  import { CloudUpload } from "lucide-svelte";
  import Button from "../components/ui/button/button.svelte";
  let selectedFile;

  async function handleFileChange(event) {
    selectedFile = event.target.files[0];
    if (!selectedFile) {
      console.error("No file selected!");
      return;
    }
  }

  async function handleSubmit() {
    if (!selectedFile) {
      console.error("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("document", selectedFile);
    formData.append("file", true);
    formData.append("user", $currentUser?.id);
    // You can append more fields here if needed, e.g., formData.append('title', 'Hello world!');

    try {
      const createdRecord = await pb.collection("messages").create(formData);
      console.log("File uploaded successfully:", createdRecord);
      // Do something with the created record if needed
      alert("file uploaded");
      selectedFile = "";
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <Button variant="outline"><CloudUpload /></Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Upload the file</Dialog.Title>
    </Dialog.Header>
    <div class="flex flex-col gap-3">
      <input type="file" id="fileInput" on:change={handleFileChange} />
      <Button variant="outline" on:click={handleSubmit}>Submit</Button>
    </div>
  </Dialog.Content>
</Dialog.Root>
