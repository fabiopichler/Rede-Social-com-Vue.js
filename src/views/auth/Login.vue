<template>
    <div class="signin d-flex flex-column justify-content-center w-100 h-100">
        <div>
            <form @submit.prevent="login" class="form card"> 
                <div>
                    <img class="my-3" src="img/tweeter-logo.svg" alt="" width="100" height="100">
                </div>

                <h1 class="h3 mt-1 mb-4 font-weight-normal">Login</h1>

                <label for="user" class="sr-only">Usuário ou email</label>

                <input v-model="user.user" type="text" id="user" class="form-control" placeholder="Usuário ou email" autofocus>

                <label for="password" class="sr-only">Senha</label>

                <input v-model="user.password" type="password" id="password" class="form-control" placeholder="Senha">

                <div class="checkbox mt-1 mb-2">
                    <label>
                        <input class="align-middle" type="checkbox" name="remember" id="remember"> Lembrar-me
                    </label>
                </div>

                <button type="submit" class="btn btn-lg btn-primary btn-block">Login</button>

                <div class="d-flex justify-content-between my-3">
                    <router-link to="/password/request">Esqueceu sua senha?</router-link>
                    
                    <router-link to="/register">Criar uma conta</router-link>
                </div>

                <p class="my-2 text-muted">&copy; 2019, Tweeter</p>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    
    data: () => ({
        user: {
            user: null,
            password: null
        }
    }),

    methods: {
        login() {
            this.user.email = this.user.user;
            axios.post('/auth/login', this.user).then(res => {
                localStorage.setItem('authToken', res.data.access_token),
                window.location.href = '/';
                
            }).catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style lang="scss">
    .signin {
        > div {
            height: 100%;
            max-height: 620px;
        }

        .form {
            width: 100%;
            max-width: 330px;
            margin: 62px auto;
            padding: 15px;
            text-align:center;

            .checkbox {
                font-weight: 400;
            }

            .form-control {
                position: relative;
                box-sizing: border-box;
                height: auto;
                padding: 10px;
                font-size: 16px;
            }

            .form-control:focus {
                z-index: 2;
            }

            input[type="text"] {
                margin-bottom: -1px;
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
            }

            input[type="password"] {
                margin-bottom: 10px;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }
        }
    }
</style>