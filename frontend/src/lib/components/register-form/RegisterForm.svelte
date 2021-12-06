<script lang="ts">
    import Textfield from '@smui/textfield';
    import CircularProgress from '@smui/circular-progress';
    import Button, { Label } from '@smui/button';
    import { register } from '$lib/services/auth.service';
    import { schema } from '$lib/validators/registration.validator';

    let displaySpinner = false;
    let error = '';
    let errors = {};
    const user = {
        login: '',
        password: '',
        confirmPassword: '',
        address: '',
        phone: '',
    };

    const onSubmit = async (e: Event) => {
        e.preventDefault();
        displaySpinner = true;
        try {
            await schema.validate(user, { abortEarly: false });
            errors = {};
        } catch (e) {
            errors = e.inner.reduce((acc, curr) => ({ ...acc, [curr.path]: curr.message }), {});
            displaySpinner = false;
            return;
        }
        try {
            const registeredUserResponse = await register(user);
            if (registeredUserResponse.status >= 400) {
                error = registeredUserResponse.statusText;
            } else {
            }
        } catch (e) {
            error = 'Looks like there\'s something wrong with server...';
        }
        displaySpinner = false;
    };
</script>
<form>
    {#if displaySpinner}
        <div style="display: flex; justify-content: center">
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
            <Textfield bind:value={user.address} label="Address" style="min-width: 250px"
                       type="text">
            </Textfield>
            {#if errors['address']}
                <p class="error-message">{errors['address']}</p>
            {/if}
        </div>
        <div>
            <Textfield bind:value={user.phone} label="Phone number" style="min-width: 250px"
                       type="text">
            </Textfield>
            {#if errors['phone']}
                <p class="error-message">{errors['phone']}</p>
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
        <div>
            <Textfield bind:value={user.confirmPassword} label="Confirm Password" style="min-width: 250px"
                       type="password">
            </Textfield>
            {#if errors['confirmPassword']}
                <p class="error-message">{errors['confirmPassword']}</p>
            {/if}
        </div>
        <div class="buttons">
            <Button on:click={(e) => onSubmit(e)} variant="raised">
                <Label>Register</Label>
            </Button>
        </div>
        <div>
            {#if error.length}
                <p>{error}</p>
            {/if}
        </div>
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