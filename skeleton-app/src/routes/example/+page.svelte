<script lang="ts">
  import fetchVoxWav from "$lib/api/fetchVoxWav";
  import { onMount } from "svelte";

  const makuranosoushiMap = [
    {
      index: 0,
      title: "春はあけぼの",
      text: "はるは、あけぼの。やうやうしろくなりゆくやまぎは、すこしあかりて、むらさきだちたるくもの、ほそくたなびきたる。",
    },
    {
      index: 1,
      title: "夏はよる",
      text: "なつは、よる。つきのころはさらなり。やみもなほ、ほたるのおほくとびちがひたる。また、ただひとつふたつなど、ほのかにうちひかりていくも、をかし。あめなどふるも、をかし。",
    },
    {
      index: 2,
      title: "秋はゆうぐれ",
      text: "あきは、ゆふぐれ。ゆふひのさして、やまのはいとちかうなりたるに、からすのねどころへいくとて、みつよつ、ふたつみつなど、とびいそぐさへあはれなり。まいて、かりなどのつらねたるが、いとちひさくみゆるは、いとをかし。ひいりはてて、かぜのおと、むしのねなど、はた、いふべきにあらず。",
    },
    {
      index: 3,
      title: "冬はつとめて",
      text: "ふゆは、つとめて。ゆきのふりたるは、いふべきにもあらず。しものいとしろきも。またさらでも、いとさむきに、ひなどいそぎおこして、すみもてわたるも、いとつきづきし。ひるになりて、ぬるくゆるびもていけば、ひをけのひも、しろきはひがちになりて、わろし。",
    },
  ];

  let selectedIndex = 0;
  let audioUrl: string | null = null;

  let isProcessing = false;
  async function generateVoxWav() {
    isProcessing = true;
    resetAudioUrl();
    try {
      const wavBlob = await fetchVoxWav(window.fetch, makuranosoushiMap[selectedIndex].text);
      audioUrl = URL.createObjectURL(wavBlob);
    } catch (error) {
      console.error("Error generating WAV file:", error);
    } finally {
      isProcessing = false;
    }
  }

  function resetAudioUrl() {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      audioUrl = null;
    }
  }

  // コンポーネントが破棄される際に Blob URL を解放
  onMount(() => {
    return () => {
      resetAudioUrl();
    };
  });
</script>

<div class="flex flex-col items-center justify-center p-4 space-y-4">
  <h2 class="h2">枕草子</h2>

  <div class="mt-4">
    {#each makuranosoushiMap as item, index (index)}
      <label class="block">
        <input type="radio" class="radio" name="season" value={item.index} bind:group={selectedIndex} />
        {item.title}
      </label>
    {/each}
  </div>

  <button class="btn preset-filled" disabled={isProcessing} on:click={generateVoxWav}>読み上げボイス生成</button>

  {#if isProcessing}
    <p class="mt-4">音声生成中...</p>
  {/if}

  {#if audioUrl}
    <audio class="mt-4" controls>
      <source src={audioUrl} type="audio/wav" />
      Your browser does not support the audio element.
    </audio>
  {/if}
</div>
