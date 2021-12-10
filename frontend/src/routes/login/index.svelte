<script lang="ts">
    import LoginForm from '$lib/components/login-form/LoginForm.svelte';

    let loggedInUser;
    const onLoggedIn = user => loggedInUser = user;
</script>
<section class="login">
    <LoginForm onLoggedIn={onLoggedIn}/>
</section>
{#if loggedInUser}
    <section class="user-data">
        <div>Login: {loggedInUser.login}</div>
        <div>Phone: {loggedInUser.phone}</div>
        <div>Address: {loggedInUser.address}</div>
    </section>
{/if}
<style>
    .login {
        width: 50%;
        margin: auto;
    }

    .user-data {
        width: 50%;
        margin: auto;
        text-align: center;
    }
</style>