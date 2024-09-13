<script>
    import { backgroundColor, primaryColor, secondaryColor } from '../stores.js';
    import { dailyEntries } from '../stores.js';
    import { userData } from '../stores.js';
    import { EditingDate } from '../stores.js';

    // Days using is the amount of days since the user started using the interface
    function getDaysUsing() {
        let startDate = new Date($userData.startDate);
        let currentDate = new Date();
        let timeDifference = currentDate.getTime() - startDate.getTime();
        let daysUsing = timeDifference / (1000 * 3600 * 24);
        return Math.floor(daysUsing);
    }
    let daysUsing = getDaysUsing();

    function getDaysUsingCurrentMonth() {
        let count = 0;
        let date = new Date().toLocaleDateString();
        
        for (let i = 0; i < $dailyEntries.length; i++) {
            let entryDate = new Date($dailyEntries[i].date);
            if (entryDate.getMonth() === new Date().getMonth() && entryDate.getFullYear() === new Date().getFullYear()) {
                count++;
            }
        }
        return count;
    }

    let daysInCurrentMonth = getDaysUsingCurrentMonth();

    let daysInCurrentMonthCount = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

</script>

<main>
    <h2 style="color: {$primaryColor};">Goals and Stats</h2>
    <p style="color: {$primaryColor};"><strong>Days Since Beginning:</strong> {daysUsing}</p>
    <p style="color: {$primaryColor};"><strong>Active Days:</strong> {$userData.daysActive}</p>

    <!-- Pie Graph to show percent of days in last month -->
    <p>{daysInCurrentMonth}</p>
    <p>{daysInCurrentMonthCount}</p>

    <!-- Pie Graph to show percent of days in goal -->

</main>

<style>

</style>