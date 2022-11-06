<template>
  <div class="screen screen-demo">
    <div class="caption">
      <slot></slot>
    </div>
    <div class="figure">
      <slot name="figure"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.screen-demo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .caption {
    padding: 0 4rem;
    flex: 2 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem 0;
  }

  .figure {
    flex: 3 0 0;
    overflow-x: hidden;
  }

  @media (max-width: 959px) {
    padding-top: var(--vp-nav-height-mobile);
    padding-bottom: 64px;

    .caption {
      padding: 0 2rem;
    }
  }
}

</style>
