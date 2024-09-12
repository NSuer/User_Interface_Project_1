<script>

  import { DailyEntry } from './stores.js';
  import { dailyEntries } from './stores.js';
  import { userData } from './stores.js';

  import Level_1_goals from './lib/Level_1_goals.svelte'

  let daysActive = $userData.daysActive
  // Days using is the amount of days since the user started using the interface
  function getDaysUsing() {
    let startDate = new Date($userData.startDate);
    let currentDate = new Date();
    let timeDifference = currentDate.getTime() - startDate.getTime();
    let daysUsing = timeDifference / (1000 * 3600 * 24);
    return Math.floor(daysUsing);
  }
  let daysUsing = getDaysUsing();
</script>

<main>
  <header>
    <div class="box_header">
      <h1>Spiritual Journal</h1>
    </div>
  </header>
  <body>
    <div class="container">
    <!-- User Overview Section -->
      <div class="left-column">
          <div class="box">
            <h2>User Overview</h2>
            <p><strong>Days Since Beginning:</strong> {daysUsing}</p>
            <p><strong>Active Days:</strong> {daysActive}</p>
          </div>
          <div class="box">
            <h2>User Overview</h2>
            <p><strong>Days Since Beginning:</strong> {daysUsing}</p>
            <p><strong>Active Days:</strong> {daysActive}</p>
          </div>
      </div>
    
      <!-- Activity Tracking Section -->
      <div class="right-column">
        <div class="padding_container">
          <Level_1_goals />
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
    border: 1px solid #ddd;
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
    border: 1px solid #ddd;
    border-radius: 10px;
  }
  .box {
    height: 50%;
    text-align: center;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 10px;
  }
  
</style>
