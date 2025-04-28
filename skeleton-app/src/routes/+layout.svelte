<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { Toaster } from "@skeletonlabs/skeleton-svelte";
  import Icon from "@iconify/svelte";
  import ThemeSwitchModal from "$lib/components/modals/ThemeSwitchModal.svelte";
  import { applyTheme } from "$lib/stores/theme";
  import { toaster } from "$lib/utils/toaster";
  import { navigateTo } from "$lib/utils/navigation";

  let { children } = $props();

  let isLoaded = $state(false);
  onMount(async () => {
    function wait(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await Promise.all([applyTheme(), wait(500)]);
    isLoaded = true;
  });
</script>

<svelte:head>
  <title>My Static WebSite</title>
</svelte:head>

<Toaster {toaster} rounded="rounded-lg" />

{#if isLoaded}
  <header class="p-4 shadow-md bg-surface-100-900">
    <div class="flex justify-between items-center">
      <a class="h5" href="./">My Static WebSite</a>
      <nav>
        <ul class="flex space-x-4">
          <li><ThemeSwitchModal /></li>
          <li>
            <button type="button" class="btn preset-filled" onclick={() => navigateTo("/")}>
              <Icon icon="mdi:home" class="size-4" />
              <span>Home</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="mx-auto">
    {@render children()}
  </main>
{:else}
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <div class="font-mono text-black text-[32px]">Now Loading...</div>
  </div>
{/if}
