<script>
    import { dailyEntries } from '../stores.js';
    import { backgroundColor, primaryColor, secondaryColor } from '../stores.js';
    import {currentView, EditingDate, SearchData} from '../stores.js';
    // @ts-ignore
    import { format, startOfMonth, addMonths, subMonths, eachDayOfInterval, isToday, isSameDay, getDaysInMonth, startOfYear, endOfYear } from 'date-fns';
  
    let currentMonth = new Date();
  
    const formatDate = (date) => format(date, 'M/d/yyyy');
    const getMonthDays = (date) => {
      const daysInMonth = getDaysInMonth(date);
      return eachDayOfInterval({
        start: new Date(date.getFullYear(), date.getMonth(), 1),
        end: new Date(date.getFullYear(), date.getMonth(), daysInMonth),
      });
    };
  
    let entries = [];
    dailyEntries.subscribe(value => {
      entries = value.map(entry => ({
        ...entry,
        date: new Date(entry.date)
      }));
    });
  
    const hasEntry = (date) => entries.some(entry => isSameDay(date, entry.date));
  
    const handleDateClick = (date) => {
        console.log(`Date clicked: ${formatDate(date)}`);
        $EditingDate = formatDate(date);
        $currentView = "Previous Entry";
    };
  
    $: days = getMonthDays(currentMonth);
  
    const goToNextMonth = () => currentMonth = addMonths(currentMonth, 1);
    const goToPreviousMonth = () => currentMonth = subMonths(currentMonth, 1);
  </script>
  

<main>
    <div class="SearchBar">
        <label for="search" style="color: {$primaryColor};">Keyword Search:</label>
        <input type="text" style="background-color:{$secondaryColor}" placeholder="Search" bind:value={$SearchData}/>
    </div>

    <div class="calendar-navigation">
        <button on:click={goToPreviousMonth} style="background-color:{$primaryColor}">‹</button>
        <span style="color: {$primaryColor};">{format(currentMonth, 'MMMM yyyy')}</span>
        <button on:click={goToNextMonth} style="background-color:{$primaryColor}">›</button>
    </div>
  
    <div class="calendar">
        {#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
            <div style="color: {$primaryColor};">{day}</div>
        {/each}
        {#each days as day}
        <button 
            class="calendar-day {hasEntry(day) ? 'has-entry' : ''}" 
            on:click={() => handleDateClick(day)}
            type="button"
            style="background-color: {isToday(day) ? 'blue' : $primaryColor};"
        >
            {format(day, 'd')}
        </button>
        {/each}
    </div>

    <!-- Return Home Button -->
    <button on:click={() => $currentView = "Home"} style="background-color:{$primaryColor}">Return Home</button>
</main>

<style>
    .calendar {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;
        max-width: 600px;
        margin: auto;
        grid-auto-rows: minmax(0, 1fr); /* Add this line */
    }
    .calendar-day {
        padding: 10px;
        text-align: center;
        cursor: pointer;
    }
    .calendar-day.has-entry::before {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        background-color: green;
        border-radius: 50%;
        margin: 0 auto;
    }
    .calendar-navigation {
        text-align: center;
        margin: 10px 0;
    }
</style>