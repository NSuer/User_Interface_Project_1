<script>

  import { DailyEntry } from '../stores.js';
  import { dailyEntries } from '../stores.js';
  import { userData } from '../stores.js';
  import { FeelingActivity, ImageActivity, PrayerActivity, JournalActivity, ReflectionActivity,SilentContemplationActivity } from '../stores.js';
  import { backgroundColor, primaryColor, secondaryColor } from '../stores.js';

  let name = $userData.name;
  let date = new Date().toLocaleDateString();
  let time = new Date().toLocaleTimeString();

  let NewDailyEntry = new DailyEntry();

  
  let successMessage = "";

  

  function saveEntry() {
    // Update the NewDailyEntry object with the date, time, and current values of the temporary activities
    NewDailyEntry = {
      date: date,
      time: time,
      feelingActivity: tempFeelingActivity,
      imageActivity: tempImageActivity,
      prayerActivity: tempPrayerActivity,
      journalActivity: tempJournalActivity,
      reflectionActivity: tempReflectionActivity,
      silentContemplationActivity: tempSilentContemplationActivity
    };


    dailyEntries.update(entries => {
      entries.push(NewDailyEntry);
      return entries;
    });
    userData.update(user => {
      user.daysActive += 1;
      return user;
    });
    successMessage = "Entries saved successfully!";
    console.log($dailyEntries);
  }

  let tempFeelingActivity = new FeelingActivity();
  let tempImageActivity = new ImageActivity();
  let tempPrayerActivity = new PrayerActivity();
  let tempJournalActivity = new JournalActivity();
  let tempReflectionActivity = new ReflectionActivity();
  let tempSilentContemplationActivity = new SilentContemplationActivity();

  function handleFeelingChange(index) {
    let option = tempFeelingActivity.options[index];
    if (tempFeelingActivity.selected.includes(option)) {
      tempFeelingActivity.selected = tempFeelingActivity.selected.filter(selectedOption => selectedOption !== option);
    } else {
      tempFeelingActivity.selected.push(option);
    }
  }

</script>
  
<main>
  <p style="color: {$primaryColor};"><strong>Name:</strong> {name}</p>
  <p style="color: {$primaryColor};"><strong>Current Date/Time:</strong> {date} {time}</p>

  <!-- Feelings -->
  <div>
    <h2 style="color: {$primaryColor};">{tempFeelingActivity.type}</h2>
    <h3 style="color: {$primaryColor};">{tempFeelingActivity.description}</h3>
    <select bind:value={tempFeelingActivity.selected}>
      {#each tempFeelingActivity.options as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>

  <!-- Image Upload -->
  <div>
    <h2 style="color: {$primaryColor};">{tempImageActivity.type}</h2>
    <h3 style="color: {$primaryColor};">{tempImageActivity.description}</h3>
    <label style="color: {$primaryColor};">
      <input type="number" placeholder="Enter time (minutes) spent" bind:value={tempImageActivity.time} />
    </label>
  </div>

  <!-- Prayer -->
  <div>
    <h2 style="color: {$primaryColor};">{tempPrayerActivity.type}</h2>
    <h3 style="color: {$primaryColor};">{tempPrayerActivity.description}</h3>
    <label style="color: {$primaryColor};">
      <input type="checkbox" bind:checked={tempPrayerActivity.boolPrayed} />
      Did you pray today?
    </label>
  </div>

  <!-- Journal -->
  <div>
    <h2 style="color: {$primaryColor};">{tempJournalActivity.type}</h2>
    <h3 style="color: {$primaryColor};">{tempJournalActivity.description}</h3>
    <textarea placeholder="Write about your day and spiritual journey..." bind:value={tempJournalActivity.text}></textarea>
  </div>

  <!-- Reflection -->
  <div>
    <h2 style="color: {$primaryColor};">{tempReflectionActivity.type}</h2>
    <h3 style="color: {$primaryColor};">{tempReflectionActivity.description}</h3>
    <input type="text" placeholder="Write the verse or passage..." bind:value={tempReflectionActivity.verse} />
    <textarea placeholder="Write your thoughts..." bind:value={tempReflectionActivity.text}></textarea>
  </div>

  <!-- Silent Contemplation -->
  <div>
    <h2 style="color: {$primaryColor};">{tempSilentContemplationActivity.type}</h2>
    <h3 style="color: {$primaryColor};">{tempSilentContemplationActivity.description}</h3>
    <textarea placeholder="Write your thoughts after silent contemplation..." bind:value={tempSilentContemplationActivity.text}></textarea>
  </div>
  <!-- Save Button -->
  <div class="section">
    <button on:click={saveEntry}>Save Entries</button>
    {#if successMessage}
      <p class="success-message">{successMessage}</p>
    {/if}
  </div>
</main>
      
<style>
  
  .success-message {
    color: green;
    font-weight: bold;
  }
  

  
  
</style>

