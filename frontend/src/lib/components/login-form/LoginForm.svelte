<script lang="ts">
    import CircularProgress from '@smui/circular-progress';
    import Textfield from '@smui/textfield';
    import Button, { Label } from '@smui/button';
    import { login } from '$lib/services/auth.service';

    export let onLoggedIn;
    let displaySpinner = false;
    let errors = {};

    let apiErrors = [];

    const onSubmit = async (e: Event) => {
        e.preventDefault();
        displaySpinner = true;
        try {
            const loginResult = await login(user).then(res => res.json());
            if (!loginResult.ok) {
                apiErrors = loginResult.errors;
            } else {
                await onLoggedIn(loginResult.user);
            }
        } finally {
            displaySpinner = false;
        }
    };
    const user = {
        login: '',
        password: '',
    };
</script>
<form>
    {#if displaySpinner}
        <div style="display: flex; justify-content: center" class="align-center">
            <CircularProgress style="height: 40px; width: 40px;" indeterminate/>
        </div>
    {/if}
    <fieldset disabled="{displaySpinner}">
        <div>
            <Textfield bind:value={user.login} label="Login" style="min-width: 250px"
                       type="text">
            </Textfield>
            {#if errors['login']}
                <p class="error-message">{errors['address']}</p>
            {/if}
        </div>
        <div>
            <Textfield bind:value={user.password} label="Password" style="min-width: 250px"
                       type="password">
            </Textfield>
            {#if errors['password']}
                <p class="error-message">{errors['password']}</p>
            {/if}
        </div>
        <div class="buttons">
            <Button on:click={(e) => onSubmit(e)} variant="raised">
                <Label>Login</Label>
            </Button>
        </div>
        {#if apiErrors.length}
            <ul>
                {#each apiErrors as apiError}
                    <li class="error-message">{apiError}</li>
                {/each}
            </ul>
        {/if}
    </fieldset>
</form>
<style>
    fieldset {
        margin: 1rem;
    }

    form div {
        width: 50%;
        margin: auto;
    }

    .buttons {
        margin-top: 1rem;
        display: flex;
    }

    .error-message {
        font-size: 0.75rem;
        color: red;
    }
</style>