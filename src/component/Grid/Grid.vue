<style src="./Grid.scss" module lang="scss"></style>
<script src="./Grid.js"></script>

<template>
  <div :class="$style.grid">
    <label for="gridCheck" :class="$style.label">Toggle grid</label>
    <input id="gridCheck" :class="$style.input" type="checkbox" />
    
    <div :style="{'--grid-max-width': breakpoint.maxWidth }" :class="$style.wrapper">
      <ul :style="{'--grid-gutter-outside': breakpoint.gutterOutside }" :class="$style.list">
        <template v-for="(column,i) in breakpoint.totalColumns">
          <li :style="{'--grid-gutter': breakpoint.gutter }" :key="`${column}-${i}`" :class="$style.column" />
        </template>
      </ul>
    </div>
  </div>
</template>
