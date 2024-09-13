<script>

  import { DailyEntry } from './stores.js';
  import { dailyEntries } from './stores.js';
  import { userData } from './stores.js';

  import { backgroundColor, primaryColor, secondaryColor } from './stores.js';
  import ThemePicker from './lib/ThemePicker.svelte';
  import ClickCalendar from './lib/ClickCalendar.svelte';
  import ActivtiesSection from './lib/ActivtiesSection.svelte'
  import GoalArea from './lib/GoalArea.svelte'

  $: document.documentElement.style.setProperty('background-color', $backgroundColor);
  // $: document.documentElement.style.setProperty('color', $primaryColor);
  // $: document.documentElement.style.setProperty('border-color', $secondaryColor);

  
</script>

<main>
  <header>
    <div class="box_header" style="border: 1px solid {$secondaryColor};">
      <h1 style="color: {$primaryColor};">Religious Journal</h1>
      <ThemePicker />
    </div>
  </header>
  <body>
    <div class="container">
    <!-- User Overview Section -->
      <div class="left-column">
          <div class="box" style="border: 1px solid {$secondaryColor};">
            <ClickCalendar />
          </div>
          <div class="box" style="border: 1px solid {$secondaryColor};">
            <GoalArea />
          </div>
      </div>
    
      <!-- Activity Tracking Section -->
      <div class="right-column">
        <div class="padding_container" style="border: 1px solid {$secondaryColor};">
          <ActivtiesSection />
        </div>
      </div>
    </div>
  </body>
</main>

<style>
  /* Height and width should be at the size of the screen */
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
  header {
    width: 100%;
    gap: 1rem;
    padding: 1rem;
    margin: auto;
  }
  body {
    width: 100%;
    height: 100%;
    gap: 1rem;
    padding: 1rem;
    margin: auto;
  }
  .container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto auto;
    gap: 1rem;
  }
  .padding_container {
    padding: 1rem;
    border: 1px solid;
    border-radius: 10px;
  }
  .left-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .right-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .box_header {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    border: 1px solid;
    border-radius: 10px;
  }
  .box {
    height: 100%;
    text-align: center;
    padding: 1rem;
    border: 1px solid;
    border-radius: 10px;
  }

  
</style>
