<script lang="ts">
    import { goto } from '$app/navigation';
</script>

<header class="header">
    <nav class="nav">
        <ul class="nav__buttons">
            <li>
                <button on:click={() => goto('/login')}>Login</button>
            </li>
            <li>
                <button on:click={() => goto('register')}>Register</button>
            </li>
        </ul>
    </nav>
</header>

<style>
    .header {
        width: 100%;
        background-color: cadetblue;
    }

    .nav__buttons {
        display: flex;
        list-style: none;
        justify-content: end;
        margin: 5px;
    }

    .nav__buttons li button {
        margin-left: 1rem;
        background-color: transparent;
        border-radius: 1rem;
        border: 1px solid black;
        color: white;
        padding: 0.5rem;
        font-size: 30px;
    }
</style>
