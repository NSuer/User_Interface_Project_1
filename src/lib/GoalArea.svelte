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

</script>

<main>
    <h2 style="color: {$primaryColor};">Goals and Stats</h2>
    <p style="color: {$primaryColor};"><strong>Days Since Beginning:</strong> {daysUsing}</p>
    <p style="color: {$primaryColor};"><strong>Active Days:</strong> {$userData.daysActive}</p>

</main>

<style>

</style>