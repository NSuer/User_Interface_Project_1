<script>
    import { colors, setBackgroundColor, setPrimaryColor, setSecondaryColor, backgroundColor, primaryColor, secondaryColor} from '../stores.js';
    import { backgroundArray, primaryArray, secondaryArray} from '../stores.js';

    let BackgroundColorOptions = colors.background;
    let PrimaryColorOptions = colors.primary;
    let SecondaryColorOptions = colors.secondary;

    function backgroundColorChange(event) {
        // Go to the next color, if at end of array, go back to the beginning
        for (let i = 0; i < backgroundArray.length; i++) {
            if (backgroundArray[i] === $backgroundColor) {
                if (i === backgroundArray.length - 1) {
                    let colorName = Object.keys(BackgroundColorOptions).find(key => BackgroundColorOptions[key] === backgroundArray[0]);
                    setBackgroundColor(colorName);
                } else {
                    let colorName = Object.keys(BackgroundColorOptions).find(key => BackgroundColorOptions[key] === backgroundArray[i + 1]);
                    setBackgroundColor(colorName);
                }
                // end the loop
                return;
            }
        }
    }

    function primaryColorChange(event) {
        // Go to the next color, if at end of array, go back to the beginning
        for (let i = 0; i < primaryArray.length; i++) {
            if (primaryArray[i] === $primaryColor) {
                if (i === primaryArray.length - 1) {
                    let colorName = Object.keys(PrimaryColorOptions).find(key => PrimaryColorOptions[key] === primaryArray[0]);
                    setPrimaryColor(colorName);
                } else {
                    let colorName = Object.keys(PrimaryColorOptions).find(key => PrimaryColorOptions[key] === primaryArray[i + 1]);
                    setPrimaryColor(colorName);
                }
                // end the loop
                return;
            }
        }
    
    }

    function secondaryColorChange(event) {
        // Go to the next color, if at end of array, go back to the beginning
        for (let i = 0; i < secondaryArray.length; i++) {
            if (secondaryArray[i] === $secondaryColor) {
                if (i === secondaryArray.length - 1) {
                    let colorName = Object.keys(SecondaryColorOptions).find(key => SecondaryColorOptions[key] === secondaryArray[0]);
                    setSecondaryColor(colorName);
                } else {
                    let colorName = Object.keys(SecondaryColorOptions).find(key => SecondaryColorOptions[key] === secondaryArray[i + 1]);
                    setSecondaryColor(colorName);
                }
                // end the loop
                return;
            }
        }
    }

</script>

<main>
    <h3 style="color: {$primaryColor};">Click each circle to change theme</h3>
    <div class="button_container">
        <div class="theme_picker_single_color">
            <!-- <label style="color: {$primaryColor};" for="background_color">Background Color</label> -->
            <button class="circle_button" style="background-color: {$backgroundColor};" on:click={backgroundColorChange}></button>
        </div>
        <div class="theme_picker_single_color">
            <!-- <label style="color: {$primaryColor};" for="primary_color">Primary Color</label> -->
            <button class="circle_button" style="background-color: {$primaryColor};" on:click={primaryColorChange}></button>
        </div>
        <div class="theme_picker_single_color">
            <!-- <label style="color: {$primaryColor};" for="secondary_color">Secondary Color</label> -->
            <button class="circle_button" style="background-color: {$secondaryColor};" on:click={secondaryColorChange}></button>
        </div>
    </div>
</main>

<style>
    .button_container {
        display: flex;
        justify-content: center;
        gap: 20px;
    }
    .theme_picker_single_color {
        display: flex;
        flex-direction: column;
    }
    .circle_button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid black;
        cursor: pointer;
    }
</style>
