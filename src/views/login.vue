<template>
  <div class="login bg-white h-screen">
    <!-- 登录框 -->
    <div
        class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-2">
        <div>
          <img
              alt="Workflow"
              class="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          />
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            登录你的账号
          </h2>
        </div>
        <form action="#" class="space-y-4 p-5 shadow" method="POST">
          <input name="remember" type="hidden" value="true"/>
          <div class="space-y-4">
            <div>
              <label class="sr-only" for="phone-number">手机号</label>
              <input
                  id="phone-number"
                  v-model="phoneNumber"
                  autocomplete="phone-number"
                  class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  name="number"
                  placeholder="请输入手机号"
                  type="number"
                  @input="inputReg"
              />
              <p
                  v-show="isPhoneNumber"
                  class="text-left mt-2 text-xs text-red-500"
              >
                手机号不能为空!
              </p>
            </div>
            <div>
              <label class="sr-only" for="password">密码</label>
              <input
                  id="password"
                  v-model="password"
                  autocomplete="current-password"
                  class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  name="password"
                  placeholder="请输入密码"
                  type="password"
                  @input="inputReg"
              />
              <p
                  v-show="isPassword"
                  class="text-left mt-2 text-xs text-red-500"
              >
                密码不能为空!
              </p>
            </div>
          </div>

          <div class="flex items-center justify-start">
            <div class="flex items-center" @click="toggleRemember">
              <input
                  id="remember-me"
                  :checked="isRemember"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  name="remember-me"
                  type="checkbox"
              />
              <label class="ml-2 block text-sm text-gray-900" for="remember-me">
                记住账号
              </label>
            </div>
          </div>

          <div>
            <button
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
                @click.prevent="submit"
            >
              登 录
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- 登陆提示框 -->
    <TransitionRoot :show="isOpen" appear as="template">
      <Dialog as="div" @close="closeModal">
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="min-h-screen px-4 text-center">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
              <DialogOverlay class="fixed inset-0"/>
            </TransitionChild>

            <span aria-hidden="true" class="inline-block h-screen align-middle">
              &#8203;
            </span>

            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
            >
              <div
                  class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
              >
                <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                >
                  登陆提示
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">你的账号或者密码错误</p>
                </div>

                <div class="mt-4">
                  <button
                      class="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                      type="button"
                      @click="closeModal"
                  >
                    重新登录
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { AxiosError, AxiosResponse } from 'axios';

const router = useRouter();
const store = useStore();
const phoneNumber: Ref<number | string | null> = ref(null);
const password: Ref<string> = ref('');
const isPhoneNumber: Ref<boolean> = ref(false);
const isPassword: Ref<boolean> = ref(false);
const isRemember: Ref<boolean> = ref(true);
const isOpen: Ref<boolean> = ref(false);


onMounted(() => {
});

const inputReg = () => {
  isPhoneNumber.value = (phoneNumber.value as string) === '';
  isPassword.value = password.value === '';
};

const closeModal = (): void => {
  password.value = '';
  isOpen.value = false;
};

const toggleRemember = (): void => {
  isRemember.value = !isRemember.value;
};

const submit = (): void => {
  if (phoneNumber.value === '' || password.value === '') {
    isPhoneNumber.value = true;
    isPassword.value = true;
    return;
  }
  store.dispatch('user/login', { phone: phoneNumber.value, password: password.value }).then((res: AxiosResponse) => {
    if (res.data.code !== 200) {
      isOpen.value = true;
      return;
    }
    router.push('/home');
  }).catch((error: AxiosError) => {
    console.error(error);
  });
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

input[type='number'] {
  -moz-appearance: textfield !important;
}
</style>
