<!-- Proizvodi.vue -->
<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold mb-4">Product List</h1>
    <div v-if="proizvodi.length > 0">
      <div v-for="proizvod in proizvodi" :key="proizvod.id" class="bg-white p-4 rounded-lg shadow mb-4">
        <router-link :to="{ name: 'ProductDetail', params: { id: proizvod.id } }" class="text-blue-600 hover:underline">
          <h2 class="text-xl font-bold">{{ proizvod.naziv }}</h2>
        </router-link>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 mt-6">
      <p>No products available.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const proizvodi = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/proizvodi');
    proizvodi.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});
</script>
