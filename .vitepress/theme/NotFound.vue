<script setup lang="ts">
import { useRouter } from 'vitepress'

const { route, go } = useRouter()
if (route.path.includes('Java-lang-updates')) {
  go('./posts/Java-lang-updates')
} else if (route.path.includes('java-lang-jvm-updates')) {
  go('./posts/java-lang-jvm-updates')
}
</script>

<template>
  <h1 class="text-3xl font-bold">404 Page Not Found</h1>
</template>
