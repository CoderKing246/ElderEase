package com.elderease.model;

import jakarta.persistence.*;

@Entity
@Table(name = "seniors")
public class Senior {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long familyId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, length = 15)
    private String phone;

    protected Senior() {
    }

    public Senior(Long familyId, String name, Integer age,
                  String address, String phone) {
        this.familyId = familyId;
        this.name = name;
        this.age = age;
        this.address = address;
        this.phone = phone;
    }

    // Retained for existing service unit tests
    public Senior(Long id, Long familyId) {
        this.id = id;
        this.familyId = familyId;
    }

    public Long getId() {
        return id;
    }

    public Long getFamilyId() {
        return familyId;
    }

    public String getName() {
        return name;
    }

    public Integer getAge() {
        return age;
    }

    public String getAddress() {
        return address;
    }

    public String getPhone() {
        return phone;
    }
}
