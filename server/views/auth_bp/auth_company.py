from flask import jsonify, request
from flask_login import login_required, logout_user, current_user, login_user

from server.models.Company import Company
from server.models import login_manager


def company_register():
    data = request.json
    email = data.get('email')
    company = Company.query.filter_by(email=email).first() # check if this email is already registered
    if company is None:
        password = data.get('password')
        # remember_me = data.get('remember_me')
        remember_me = True
        new_company = Company(
            data.get('company_name'),
            email,
            data.get('phone_number'),
            data.get('location'),
            data.get('profile_picture'),
            data.get('company_url'),
            data.get('facebook_url'),
            data.get('instagram_url'),
            data.get('about_me')
        )
        new_company.set_password(password)
        Company.add_new_company(new_company)
        if remember_me:
            login_user(new_company, remember=True) # Log in with the newly created user with remember me on
        else: 
            login_user(new_company) # Log in with the newly created user with remember me off
        
        return jsonify({'message': 'success', 'id': new_company.id}), 200
    else:
        return jsonify({'error': 'already_exists'}), 403

    
def company_login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    # remember_me = data.get('remember_me')
    remember_me = True

    company = Company.query.filter_by(email=email).first()
    if company and company.check_password(password):
        if remember_me:
            login_user(company, remember=True)  # Log in with the existing user with remember me on
        else: 
            login_user(company) # Log in with the existing user with remember me off
        return jsonify({'message': 'success', 'id': company.id})
    elif not company:
        return jsonify({'error': 'no_exists'}), 403
    else:
        return jsonify({'error': 'wrong_password'}), 403


def company_delete():
    data = request.json
    email = data.get('email')
    company = Company.query.filter_by(email=email).first() # check if this email exists
    if company is not None:
        Company.delete_company(email)
        return jsonify({'message': 'success'}), 200
    return jsonify({'error': 'email_doesnt_exist'}), 403


@login_manager.user_loader
def load_user(user_id):  # Checks if user is logged-in on every page load.
    if user_id is not None:
        return Company.query.get(user_id)
    return None


@login_manager.unauthorized_handler
def unauthorized(): # Redirect unauthorized users to Login page.
    return jsonify({'error': 'must_login'}), 403


@login_required 
# @login_manager.user_loader determines wether or not the user is logged in
# & @login_manager.unauthorized_handler - if the user is not logged in
def company_logout():
    logout_user()
    return jsonify({'message': 'success'})
