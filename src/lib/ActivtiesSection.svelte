<script>

  import { DailyEntry } from '../stores.js';
  import { dailyEntries } from '../stores.js';
  import { userData } from '../stores.js';
  import { currentView, EditingDate } from '../stores.js';
  
  import { FeelingActivity, ImageActivity, PrayerActivity, JournalActivity, ReflectionActivity,SilentContemplationActivity } from '../stores.js';
  import { backgroundColor, primaryColor, secondaryColor } from '../stores.js';

  let name = $userData.name;
  let date = new Date().toLocaleDateString();
  let time = new Date().toLocaleTimeString();
  let NewDailyEntry = new DailyEntry();
  let successMessage = "";
  // When loading the page, the current date will be the date that the user is editing
  // The current View will also be the editing view
  let validDate = true;
  let DisableInputs = true;
  $EditingDate = date;
  $currentView = "Edit Entry";
  if ($currentView === "Edit Entry") {
    DisableInputs = false;
  }

  function saveEntry() {
    if ($currentView = "Edit Entry") {
      // if there is not an entry save for the current date, create a new entry
      if ($dailyEntries.filter(entry => entry.date === date).length === 0) {
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
      } else {
        // if there is already an entry for the current date, update the entry
        // Update the entry with current values of the temporary activities
        dailyEntries.update(entries => {
          entries = entries.map(entry => {
            if (entry.date === $EditingDate) {
              entry.feelingActivity = tempFeelingActivity;
              entry.imageActivity = tempImageActivity;
              entry.prayerActivity = tempPrayerActivity;
              entry.journalActivity = tempJournalActivity;
              entry.reflectionActivity = tempReflectionActivity;
              entry.silentContemplationActivity = tempSilentContemplationActivity;
            }
            return entry;
          });
          return entries;
        });
        successMessage = "Entries saved successfully!";
        console.log($dailyEntries);
      }
      DisableInputs = true;
    } else if ($currentView === "Home") {
      successMessage = "Please select a date to view or edit an entry.";
    }
  }

  // if currentView is "Previous Entry", load the previous entry for the current date
  $:{
    if ($currentView === "Previous Entry") {
      let SearchedDate = $EditingDate;
      loadPreviousEntry(SearchedDate);
    } else if ($currentView === "Home") {
      let SearchedDate = date;
      loadPreviousEntry(SearchedDate);
    }

  }
  

  function loadPreviousEntry(SearchedDate) {
    // Load the dailyEntries element with the same date as the current date into the temporary activities
    console.log(date);
    console.log(SearchedDate);
    successMessage = "";
    DisableInputs = true;
    let entry = $dailyEntries.filter(entry => entry.date === SearchedDate)[0];

    if (entry) {
      tempFeelingActivity = entry.feelingActivity;
      tempImageActivity = entry.imageActivity;
      tempPrayerActivity = entry.prayerActivity;
      tempJournalActivity = entry.journalActivity;
      tempReflectionActivity = entry.reflectionActivity;
      tempSilentContemplationActivity = entry.silentContemplationActivity;
    }
    console.log(entry);
    if (!entry ) {
      
      if (date === SearchedDate) {
        tempFeelingActivity = new FeelingActivity();
        tempImageActivity = new ImageActivity();
        tempPrayerActivity = new PrayerActivity();
        tempJournalActivity = new JournalActivity();
        tempReflectionActivity = new ReflectionActivity();
        tempSilentContemplationActivity = new SilentContemplationActivity();
        validDate = true;
      } else {
        validDate = false;
      }
    } else {
      validDate = true;
    }
  }

  function startEditing() {
    // Will Un-disable the input fields and allow the user to edit the entries
    $currentView = "Edit Entry"
    successMessage = "Entered Editing Mode";
    DisableInputs = false;
  }

  let tempFeelingActivity = new FeelingActivity();
  let tempImageActivity = new ImageActivity();
  let tempPrayerActivity = new PrayerActivity();
  let tempJournalActivity = new JournalActivity();
  let tempReflectionActivity = new ReflectionActivity();
  let tempSilentContemplationActivity = new SilentContemplationActivity();

</script>
  
<main>
  <p style="color: {$primaryColor};"><strong>Name:</strong> {name}</p>
  <p style="color: {$primaryColor};"><strong>Current Date/Time:</strong> {date} {time}</p>
  {#if $currentView === "Previous Entry" || $currentView === "Edit Entry"}
    <p style="color: {$primaryColor};"><strong>Currently Viewing:</strong> {$EditingDate}</p>
  {/if}
  
  {#if validDate === false}
    <div class="invalidDate">
      <p>There is no data for this date</p>
      <p>Please select a date with a green dot or the current date</p>
    </div>
  {:else}
    <!-- Feelings -->
    <div>
      <h2 style="color: {$primaryColor};">{tempFeelingActivity.type}</h2>
      <h3 style="color: {$primaryColor};">{tempFeelingActivity.description}</h3>
      <select bind:value={tempFeelingActivity.selected}>
        {#each tempFeelingActivity.options as option}
          <option value={option} style="background-color:{$secondaryColor}" disabled={DisableInputs}>{option}</option>
        {/each}
      </select>
    </div>

    <!-- Image Upload -->
    <div>
      <h2 style="color: {$primaryColor};">{tempImageActivity.type}</h2>
      <h3 style="color: {$primaryColor};">{tempImageActivity.description}</h3>
      <label style="color: {$primaryColor};">
        <input type="number" placeholder="Enter time (minutes) spent"  style="background-color:{$secondaryColor}" bind:value={tempImageActivity.time} disabled={DisableInputs}/>
      </label>
    </div>

    <!-- Prayer -->
    <div>
      <h2 style="color: {$primaryColor};">{tempPrayerActivity.type}</h2>
      <h3 style="color: {$primaryColor};">{tempPrayerActivity.description}</h3>
      <label style="color: {$primaryColor};">
        <input type="checkbox" style="background-color:{$secondaryColor}" bind:checked={tempPrayerActivity.boolPrayed} disabled={DisableInputs}/>
        Did you pray today?
      </label>
    </div>

    <!-- Journal -->
    <div>
      <h2 style="color: {$primaryColor};">{tempJournalActivity.type}</h2>
      <h3 style="color: {$primaryColor};">{tempJournalActivity.description}</h3>
      <textarea placeholder="Write about your day and spiritual journey..."  style="background-color:{$secondaryColor}" bind:value={tempJournalActivity.text} disabled={DisableInputs}></textarea>
    </div>

    <!-- Reflection -->
    <div>
      <h2 style="color: {$primaryColor};">{tempReflectionActivity.type}</h2>
      <h3 style="color: {$primaryColor};">{tempReflectionActivity.description}</h3>
      <textarea placeholder="Write the verse or passage..." style="background-color:{$secondaryColor}" bind:value={tempReflectionActivity.verse} disabled={DisableInputs}></textarea>
      <textarea placeholder="Write your thoughts..." style="background-color:{$secondaryColor}" bind:value={tempReflectionActivity.text} disabled={DisableInputs}></textarea>
    </div>

    <!-- Silent Contemplation -->
    <div>
      <h2 style="color: {$primaryColor};">{tempSilentContemplationActivity.type}</h2>
      <h3 style="color: {$primaryColor};">{tempSilentContemplationActivity.description}</h3>
      <textarea placeholder="Write your thoughts after silent contemplation..." style="background-color:{$secondaryColor}" bind:value={tempSilentContemplationActivity.text} disabled={DisableInputs}></textarea>
    </div>
    <!-- Save Button -->
    <div class="section">
      <button on:click={saveEntry} style="background-color:{$primaryColor}" disabled={DisableInputs}>Save</button>
      <button on:click={startEditing} style="background-color:{$primaryColor}">Edit</button>
      {#if successMessage}
        <p class="success-message">{successMessage}</p>
      {/if}
    </div>
  {/if}
</main>
      
<style>
  .success-message {
    color: green;
    font-weight: bold;
  }
  textarea {
    width: 100%;
    height: 100px;
  }
  .invalidDate {
    color: red;
    font-weight: bold;
    width: 100%;
    height: 100%;
  } 

  
  
</style>

