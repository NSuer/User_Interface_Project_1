<script lang="ts">
    // I'm using ts here because it's required for vegalite, which is what the professor recommended for charts
    import type { VisualizationSpec } from "svelte-vega";
    import { VegaLite } from "svelte-vega";

    import { backgroundColor, primaryColor, secondaryColor } from '../stores.js';
    import { dailyEntries } from '../stores.js';
    import { userData } from '../stores.js';
    import { goal } from '../stores.js';

    // Days using is the amount of days since the user started using the interface
    function getDaysUsing() {
        let startDate = new Date($userData.startDate);
        let currentDate = new Date();
        let timeDifference = currentDate.getTime() - startDate.getTime();
        let daysUsing = timeDifference / (1000 * 3600 * 24);
        return Math.floor(daysUsing);
    }
    
    function getDaysUsingCurrentMonth() {
        let count = 0;
        
        for (let i = 0; i < $dailyEntries.length; i++) {
            let entryDate = new Date($dailyEntries[i].date);
            if (entryDate.getMonth() === new Date().getMonth() && entryDate.getFullYear() === new Date().getFullYear()) {
                count++;
            }
        }
        return count;
    }

    function getCurrentStreak() {
        let count = 0;
        let date = new Date().toLocaleDateString();
        let entryDate = new Date().toLocaleDateString();

        for (let i = $dailyEntries.length -1; i > 0 ; i--) {
            entryDate = new Date($dailyEntries[i].date).toLocaleDateString();
            if (entryDate === date) {
                count++;
                let TempDate = new Date(date);
                TempDate.setDate(TempDate.getDate() - 1);
                date = TempDate.toLocaleDateString();
            } else {
                break;
            }
        }
        return count;
    }

    let currentStreak = getCurrentStreak();
    let daysUsing = getDaysUsing();
    let daysInCurrentMonth = getDaysUsingCurrentMonth();
    let daysInCurrentMonthCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

    let currentGoalNum = $goal - daysInCurrentMonth;

    $: {
        currentStreak = getCurrentStreak();
        daysInCurrentMonth = getDaysUsingCurrentMonth();
        if ($goal < 0) {
            $goal = 0;
        }
        if ($goal > daysInCurrentMonthCount) {
            $goal = daysInCurrentMonthCount;
        }

        if (daysInCurrentMonth > $goal) {
            currentGoalNum = 0;
        } else {
            currentGoalNum = $goal - daysInCurrentMonth;
        }

    }


    let spec: VisualizationSpec;

    $: {
        spec = {
            "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
            "title": {
                "text": "Monthly Consistency",
                "color": $primaryColor,
                "fontSize": 20,
                "font": "Arial"
            },
            "background": $backgroundColor,
            "description": "A pie chart showing percentage of days completed versus goal.",
            "data": {
                "values": [
                    {"category": 'Days Remaining', "value": currentGoalNum},
                    {"category": 'Days Completed', "value": daysInCurrentMonth},
                ]
            },
            "mark": "arc",
            "encoding": {
                "theta": {"field": "value", "type": "quantitative"},
                "color": {"field": "category", "type": "nominal"}
            },
        };
    }

</script>

<main>
    <h2 style="color: {$primaryColor};">Goals and Stats</h2>
    <p style="color: {$primaryColor};"><strong>Days Since Beginning:</strong> {daysUsing}</p>
    <p style="color: {$primaryColor};"><strong>Active Days:</strong> {$userData.daysActive}</p>

    <!-- Streak -->
    <p style="color: {$primaryColor};"><strong>Current Streak:</strong> {currentStreak}</p>

    <!-- Pie Graph to show percent of days in last month -->

    <label style="color: {$primaryColor};">
        <strong>Monthly Consistency Goal:</strong>
        <input type="number" placeholder="Enter time (minutes) spent"  style="background-color:{$secondaryColor}" bind:value={$goal}/>
    </label>
    <VegaLite {spec} />

    <!-- Pie Graph to show percent of days in goal -->

</main>

<style>

</style>