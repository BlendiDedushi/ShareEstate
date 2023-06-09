import mongoose from 'mongoose';
import fetch from 'node-fetch';

const EstateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  distance: {
    type: String,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: String,
    required: true,
  },
  characteristics: {
    rooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    balcony: {
      type: Boolean,
      default: false,
    }
  },
  lifestyle: {
    smoking: {
      type: Boolean,
      default: false,
    },
    studentFriendly: {
      type: Boolean,
      default: false,
    },
    familyFriendly: {
      type: Boolean,
      default: false,
    },
    petsAllowed: {
      type: Boolean,
      default: false,
    },
    ageRestrictions: {
      type: [Number],
    },
  },
});

EstateSchema.statics.getCoordinatesFromAddress = async function (address) {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } else {
      throw new Error('No coordinates found for the given address');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default mongoose.model('Estate', EstateSchema);