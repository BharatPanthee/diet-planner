// Firestore Database Service for AuraDiet
import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Fetch a user's subscription and limit profile from Firestore.
 * @param {string} uid - Authenticated user's unique ID.
 * @returns {Promise<Object|null>} User profile details.
 */
export async function getUserProfile(uid) {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

/**
 * Setup a default profile document for new authenticated users.
 * @param {string} uid - Authenticated user's ID.
 * @param {Object} user - User object containing name, email.
 * @returns {Promise<Object>} The created profile document data.
 */
export async function createUserProfileIfNew(uid, user) {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      const defaultProfile = {
        name: user.displayName || user.name || "AuraDiet User",
        email: user.email,
        isPro: false, // Starts on Free tier (BYOK). Upgrades on checkout/trial request.
        generationsUsedThisWeek: 0,
        generationsLimitPerWeek: 4,
        weekStartedAt: new Date().toISOString()
      };
      await setDoc(userRef, defaultProfile);
      return defaultProfile;
    }
    
    return userSnap.data();
  } catch (error) {
    console.error("Error setting up user profile:", error);
    throw error;
  }
}

/**
 * Update a user's subscription state in Firestore (e.g. Upgrade to Pro).
 * @param {string} uid - User ID.
 * @param {boolean} isPro - New subscription state.
 * @returns {Promise<void>}
 */
export async function updateUserSubscription(uid, isPro) {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      isPro: isPro,
      generationsUsedThisWeek: 0,
      weekStartedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error upgrading subscription:", error);
    throw error;
  }
}

/**
 * Increment the user's weekly usage counter. Resets if a week has passed.
 * @param {string} uid - User ID.
 * @param {Object} currentProfile - User's current database profile state.
 * @returns {Promise<Object>} Updated profile usage state.
 */
export async function incrementWeeklyUsage(uid, currentProfile) {
  try {
    const userRef = doc(db, "users", uid);
    const now = new Date();
    const weekStart = new Date(currentProfile.weekStartedAt);
    const diffDays = (now - weekStart) / (1000 * 60 * 60 * 24);
    
    let used = currentProfile.generationsUsedThisWeek || 0;
    let weekStartedAt = currentProfile.weekStartedAt;

    if (diffDays >= 7) {
      // 7 days elapsed, reset weekly counter to 1 (this generation is the first of the new week)
      used = 1;
      weekStartedAt = now.toISOString();
    } else {
      // Within the same week, increment
      used += 1;
    }

    const updates = {
      generationsUsedThisWeek: used,
      weekStartedAt: weekStartedAt
    };

    await updateDoc(userRef, updates);
    return { ...currentProfile, ...updates };
  } catch (error) {
    console.error("Error incrementing weekly usage:", error);
    throw error;
  }
}

/**
 * Save a generated diet plan into the user's secure Firestore subcollection.
 * @param {string} uid - User ID.
 * @param {Object} planData - Diet plan strategies JSON payload.
 * @returns {Promise<string>} Created document ID.
 */
export async function saveGeneratedPlan(uid, planData) {
  try {
    const plansRef = collection(db, "users", uid, "plans");
    const docRef = await addDoc(plansRef, {
      strategies: planData.strategies,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving plan to DB:", error);
    throw error;
  }
}

/**
 * Fetch the developer's Gemini API key from system config.
 * Access is protected by Firestore security rules (requires user to be logged in and isPro === true).
 * @returns {Promise<string|null>} The developer's Gemini API key.
 */
export async function getDeveloperApiKey() {
  try {
    const configRef = doc(db, "system", "config");
    const configSnap = await getDoc(configRef);
    if (configSnap.exists()) {
      return configSnap.data().geminiApiKey || null;
    }
    return null;
  } catch (error) {
    console.error("Failed to read developer API key from Firestore. Ensure security rules are configured and subscription is active.", error);
    throw new Error("Billing configuration error: Access denied to developer keys. Please verify your Pro status.");
  }
}
