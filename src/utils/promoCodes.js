/**
 * Promo Code Configuration
 * 
 * Supports two types of promotions:
 * 1. PERCENTAGE: Discount as a percentage of subtotal
 * 2. FREE_PRINTS: Free prints based on quantity thresholds
 */

export const PROMO_TYPES = {
  PERCENTAGE: 'percentage',
  FREE_PRINTS: 'free_prints'
};

export const PROMO_CODES = {
  // Percentage-based discounts
  SAVE10: {
    code: 'SAVE10',
    type: PROMO_TYPES.PERCENTAGE,
    value: 0.10,
    description: 'Get 10% off your order'
  },
  SAVE15: {
    code: 'SAVE15',
    type: PROMO_TYPES.PERCENTAGE,
    value: 0.15,
    description: 'Get 15% off your order'
  },
  SAVE20: {
    code: 'SAVE20',
    type: PROMO_TYPES.PERCENTAGE,
    value: 0.20,
    description: 'Get 20% off your order'
  },
  FIRSTORDER: {
    code: 'FIRSTORDER',
    type: PROMO_TYPES.PERCENTAGE,
    value: 0.25,
    description: 'Get 25% off your first order'
  },

  // Free prints based on quantity thresholds for 10x15
  PRINT50: {
    code: 'PRINT50',
    type: PROMO_TYPES.FREE_PRINTS,
    description: 'Upload 50+ photos in 10x15, get 25 free prints',
    rules: {
      size: '10x15',
      minQuantity: 50,
      freeQuantity: 25
    }
  },
  PRINT100: {
    code: 'PRINT100',
    type: PROMO_TYPES.FREE_PRINTS,
    description: 'Upload 100+ photos in 10x15, get 50 free prints',
    rules: {
      size: '10x15',
      minQuantity: 100,
      freeQuantity: 50
    }
  },

  // Free prints for 13x18
  PRINT30_13X18: {
    code: 'PRINT30_13X18',
    type: PROMO_TYPES.FREE_PRINTS,
    description: 'Upload 30+ photos in 13x18, get 15 free prints',
    rules: {
      size: '13x18',
      minQuantity: 30,
      freeQuantity: 15
    }
  },
  PRINT60_13X18: {
    code: 'PRINT60_13X18',
    type: PROMO_TYPES.FREE_PRINTS,
    description: 'Upload 60+ photos in 13x18, get 30 free prints',
    rules: {
      size: '13x18',
      minQuantity: 60,
      freeQuantity: 30
    }
  },

  // Free prints for 16x21
  PRINT25_16X21: {
    code: 'PRINT25_16X21',
    type: PROMO_TYPES.FREE_PRINTS,
    description: 'Upload 25+ photos in 16x21, get 10 free prints',
    rules: {
      size: '16x21',
      minQuantity: 25,
      freeQuantity: 10
    }
  },
  PRINT50_16X21: {
    code: 'PRINT50_16X21',
    type: PROMO_TYPES.FREE_PRINTS,
    description: 'Upload 50+ photos in 16x21, get 25 free prints',
    rules: {
      size: '16x21',
      minQuantity: 50,
      freeQuantity: 25
    }
  },

  // Free prints for 20x25
  PRINT20_20X25: {
    code: 'PRINT20_20X25',
    type: PROMO_TYPES.FREE_PRINTS,
    description: 'Upload 20+ photos in 20x25, get 10 free prints',
    rules: {
      size: '20x25',
      minQuantity: 20,
      freeQuantity: 10
    }
  },
  PRINT40_20X25: {
    code: 'PRINT40_20X25',
    type: PROMO_TYPES.FREE_PRINTS,
    description: 'Upload 40+ photos in 20x25, get 20 free prints',
    rules: {
      size: '20x25',
      minQuantity: 40,
      freeQuantity: 20
    }
  },

  // Free prints for 20x30
  PRINT15_20X30: {
    code: 'PRINT15_20X30',
    type: PROMO_TYPES.FREE_PRINTS,
    description: 'Upload 15+ photos in 20x30, get 5 free prints',
    rules: {
      size: '20x30',
      minQuantity: 15,
      freeQuantity: 5
    }
  },
  PRINT30_20X30: {
    code: 'PRINT30_20X30',
    type: PROMO_TYPES.FREE_PRINTS,
    description: 'Upload 30+ photos in 20x30, get 15 free prints',
    rules: {
      size: '20x30',
      minQuantity: 30,
      freeQuantity: 15
    }
  },
};

/**
 * Get price per image based on size and paper type
 */
export const getPricePerImage = (size, paper) => {
  let price = 1.25;
  if (size === '10x15') price = 1.25;
  else if (size === '13x18') price = 2.50;
  else if (size === '16x21') price = 3.25;
  else if (size === '20x25') price = 5;
  else if (size === '20x30') price = 7;

  if (paper === 'Glossy') price += 2;
  return price;
};

/**
 * Validate and apply promo code
 * @param {string} code - Promo code to validate
 * @param {Array} images - Array of uploaded images with size, paper, quantity
 * @param {number} subtotal - Current order subtotal
 * @returns {Object} - { valid, discount, message, promoDetails }
 */
export const validateAndApplyPromo = (code, images, subtotal) => {
  const upperCode = code.toUpperCase().trim();
  const promoConfig = PROMO_CODES[upperCode];

  if (!promoConfig) {
    return {
      valid: false,
      discount: 0,
      message: 'Invalid promo code',
      promoDetails: null
    };
  }

  // Handle percentage discount
  if (promoConfig.type === PROMO_TYPES.PERCENTAGE) {
    const discount = subtotal * promoConfig.value;
    return {
      valid: true,
      discount,
      message: `${promoConfig.description} applied!`,
      promoDetails: promoConfig,
      discountType: 'percentage'
    };
  }

  // Handle free prints
  if (promoConfig.type === PROMO_TYPES.FREE_PRINTS) {
    const { size, minQuantity, freeQuantity } = promoConfig.rules;
    
    // Calculate total quantity for the specific size
    const totalQuantityForSize = images
      .filter(img => img.size === size)
      .reduce((sum, img) => sum + img.quantity, 0);

    if (totalQuantityForSize < minQuantity) {
      return {
        valid: false,
        discount: 0,
        message: `You need ${minQuantity} photos in ${size} size to use this promo code (currently ${totalQuantityForSize})`,
        promoDetails: null
      };
    }

    // Find a representative image of the specified size to get the price
    const sampleImage = images.find(img => img.size === size);
    if (!sampleImage) {
      return {
        valid: false,
        discount: 0,
        message: `No images found with size ${size}`,
        promoDetails: null
      };
    }

    // Calculate discount (free prints value)
    const pricePerPrint = getPricePerImage(size, sampleImage.paper);
    const discount = pricePerPrint * freeQuantity;

    return {
      valid: true,
      discount,
      message: `${promoConfig.description} - You saved ${freeQuantity} prints!`,
      promoDetails: promoConfig,
      discountType: 'free_prints',
      freeQuantity
    };
  }

  return {
    valid: false,
    discount: 0,
    message: 'Unknown promo code type',
    promoDetails: null
  };
};

/**
 * Get all promo codes grouped by type
 */
export const getPromoCodesByType = () => {
  const percentageCodes = [];
  const freePrintCodes = [];

  Object.values(PROMO_CODES).forEach(promo => {
    if (promo.type === PROMO_TYPES.PERCENTAGE) {
      percentageCodes.push(promo);
    } else if (promo.type === PROMO_TYPES.FREE_PRINTS) {
      freePrintCodes.push(promo);
    }
  });

  return { percentageCodes, freePrintCodes };
};
