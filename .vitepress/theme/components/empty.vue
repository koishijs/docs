<template>
  <div class="k-empty">
    <div class="image">
      <svg class="k-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor" d="M256,0C114.62,0,0,114.62,0,256S114.62,512,256,512,512,397.38,512,256,397.38,0,256,0ZM455.48,276a40,40,0,0,1-33.07,21.45,280.06,280.06,0,0,1-39.12,58.33,8,8,0,0,0-1.06,8.9L401,401l-36.37-18.77a8,8,0,0,0-8.9,1.06,280.06,280.06,0,0,1-58.33,39.12A40,40,0,0,1,276,455.48a40.16,40.16,0,0,0,4-25,278,278,0,0,1-61.42,17.71A25,25,0,0,1,193.87,471a25,25,0,0,0,8.69-20.66,281.77,281.77,0,0,1-56,.5C301.54,432,432,301.54,450.84,146.55a281.77,281.77,0,0,1-.5,56A25,25,0,0,0,471,193.87a25,25,0,0,1-22.85,24.65,278,278,0,0,1-17.71,61.42A40.16,40.16,0,0,0,455.48,276Z"/>
      </svg>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss">

.k-empty {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
  padding: 2rem 0;
  gap: 1.5rem;
  font-size: 14px;
  color: var(--el-text-color-secondary);

  .image {
    width: 10rem;
    color: var(--vp-c-bg-soft);
    transition: color 0.3s ease;

    svg {
      height: 100%;
      width: 100%;
    }
  }
}

</style>
