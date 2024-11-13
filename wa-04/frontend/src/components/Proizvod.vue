<template>
  <div v-if="proizvodi.length > 0">
    <div v-for="proizvod in proizvodi" :key="proizvod.id" class="bg-white mb-8">
      <!-- Breadcrumb and Main Content Sections -->
      <div class="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li>
              <div class="flex items-center">
                <a href="#" class="mr-2 text-sm font-medium text-gray-900">Odjeća</a>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 10l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </li>
            <li class="text-sm">
              <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">{{ proizvod.naziv }}</a>
            </li>
          </ol>
        </nav>
      </div>

      <!-- Image Gallery -->
      <div v-if="proizvod.slike && proizvod.slike.length > 0" class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div class="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
          <img :src="proizvod.slike[0]" alt="Product Image" class="h-full w-full object-cover object-center" />
        </div>
        <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img :src="proizvod.slike[3]" alt="Gallery Image 1" class="h-full w-full object-cover object-center"/>
          </div>
          <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img :src="proizvod.slike[2]" alt="Gallery Image 2" class="h-full w-full object-cover object-center"/>
          </div>
        </div>
        <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img :src="proizvod.slike[1]" alt="Gallery Image 3" class="h-full w-full object-cover object-center"/>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 mt-6">
        <p>No images available for this product.</p>
      </div>

      <!-- Product Information Section -->
      <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ proizvod.naziv }}</h1>
        </div>

        <!-- Purchase Options -->
        <div class="mt-4 lg:row-span-3 lg:mt-0">
          <p class="text-3xl tracking-tight text-gray-900">{{ proizvod.cijena }}€</p>

          <form class="mt-10" @submit.prevent="posaljiNarudzbu">
            <!-- Color Choices -->
            <div>
  <h3 class="text-sm font-medium text-gray-900">Boje</h3>
  <fieldset aria-label="Choose a color" class="mt-4">
    <div class="flex items-center space-x-3">
      <!-- Loop through colors -->
      <label v-for="boja in proizvod.boje" :key="boja" class="relative flex items-center justify-center cursor-pointer rounded-full p-0.5">
  <input type="radio" name="color-choice" :value="boja" v-model="selectedColor" class="sr-only" />
  <span :style="{ backgroundColor: boja }" class="h-8 w-8 rounded-full border border-black border-opacity-10"></span>
</label>     
    </div>
  </fieldset>
</div>


            <!-- Size Choices -->
            <h3 class="text-sm font-medium text-gray-900">Velicine</h3> <!-- Heading appears once -->

<div v-for="velicina in proizvod.velicine" :key="velicina" class="mt-4">
  <label class="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
    <input type="radio" name="size-choice" :value="velicina" v-model="selectedSize" class="sr-only" />
    <span>{{ velicina }}</span>
  </label>
</div>


            <!-- Add to Cart Button -->
            <button type="submit" class="mt-10 w-full rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none">
              Dodaj u košaricu
            </button>
          </form>

          <!-- Success Message -->
          <p v-if="orderSuccess" class="mt-4 text-green-600 font-semibold">Narudžba je uspješno dodana u košaricu!</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center text-gray-500 mt-6">
    <p>No products available.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

let proizvodi = ref([]);
let selectedColor = ref(null);
let selectedSize = ref(null);
let orderSuccess = ref(false);

// Fetch all products data
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/proizvodi');
    proizvodi.value = response.data;
  } catch (error) {
    console.error('Greška u dohvatu podataka: ', error);
  }
});

// Order submission function
function posaljiNarudzbu() {
  console.log('Naruceno');
  orderSuccess.value = true; // Show success message
}
</script>
