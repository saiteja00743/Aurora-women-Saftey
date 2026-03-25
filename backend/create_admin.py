"""
Script to create an admin user for accessing the Admin Dashboard
"""
import sys
import os
from passlib.context import CryptContext

# Add parent directory to path to import modules
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal, engine, Base
from models import User

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def create_admin_user():
    """Create an admin user"""
    db = SessionLocal()
    
    try:
        # Default admin credentials
        admin_email = "admin@aurora.com"
        admin_password = "admin123"  # Change this in production!
        admin_username = "Admin"
        
        # Check if admin already exists
        existing_admin = db.query(User).filter(User.email == admin_email).first()
        
        if existing_admin:
            print("Admin user already exists!")
            print(f"\nEmail: {admin_email}")
            print(f"Password: {admin_password}")
            print("\nYou can use these credentials to login to the admin dashboard.")
            
            # Update to admin if not already
            if existing_admin.is_admin == 0:
                existing_admin.is_admin = 1
                db.commit()
                print("\nUpdated existing user to admin role!")
            return
        
        # Create new admin user
        admin_user = User(
            username=admin_username,
            email=admin_email,
            password=hash_password(admin_password),
            is_admin=1  # Set as admin
        )
        
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        print("Admin user created successfully!\n")
        print("=" * 50)
        print("ADMIN CREDENTIALS")
        print("=" * 50)
        print(f"Email:    {admin_email}")
        print(f"Password: {admin_password}")
        print(f"Username: {admin_username}")
        print("=" * 50)
        print("\nHow to use:")
        print("1. Go to http://localhost:5173")
        print("2. Click 'Get Started' and then 'Login'")
        print("3. Use the credentials above")
        print("4. After login, you'll see the 'Admin Dashboard' option")
        print("\nIMPORTANT: Change the password in production!")
        
    except Exception as e:
        print(f"❌ Error creating admin user: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

def create_regular_user():
    """Create a regular test user"""
    db = SessionLocal()
    
    try:
        user_email = "user@aurora.com"
        user_password = "user123"
        user_username = "TestUser"
        
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == user_email).first()
        
        if existing_user:
            print("\nRegular user already exists!")
            print(f"Email: {user_email}")
            print(f"Password: {user_password}")
            return
        
        # Create new regular user
        regular_user = User(
            username=user_username,
            email=user_email,
            password=hash_password(user_password),
            is_admin=0  # Regular user
        )
        
        db.add(regular_user)
        db.commit()
        
        print("\nRegular test user created!")
        print(f"Email: {user_email}")
        print(f"Password: {user_password}")
        
    except Exception as e:
        print(f"❌ Error creating regular user: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Setting up Aurora Admin Access...\n")
    
    # Recreate database to include new is_admin field
    print("Updating database schema...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("Database schema updated!\n")
    
    # Create admin user
    create_admin_user()
    
    # Create regular test user
    create_regular_user()
    
    print("\n" + "=" * 50)
    print("Setup Complete!")
    print("=" * 50)
    print("\nSummary:")
    print("   - Admin user: admin@aurora.com / admin123")
    print("   - Regular user: user@aurora.com / user123")
    print("\nNext steps:")
    print("   1. Run: python add_demo_data.py (to add sample complaints)")
    print("   2. Start backend: uvicorn main:app --reload")
    print("   3. Start frontend: npm run dev")
    print("   4. Login as admin to access Admin Dashboard")
